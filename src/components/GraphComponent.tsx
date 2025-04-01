import GraphContext from "../context/GraphContext";
import { useEffect, useRef, useContext, useState } from "react";
import Sigma from "sigma";
import { SigmaStageEventPayload } from "sigma/sigma";
import { useDrawDefaultGraph } from "../hooks/useDrawDefaultGraph";
import { useHandleRightClick } from "../hooks/useHadleRightClick";

const GraphComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { graph, addNode, addEdge, clearGraph } = useContext(GraphContext);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [firstRender, setFirstRender] = useState(true);
  const { rigthClick } = useHandleRightClick();

  if (firstRender) {
    clearGraph();
    console.log("draw default graph");
    useDrawDefaultGraph(graph);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    setFirstRender(false);

    const sigma = new Sigma(graph, containerRef.current, {
      maxCameraRatio: 3,
      minCameraRatio: 0.5,
      defaultEdgeType: "arrow",
      renderEdgeLabels: true,
      defaultEdgeColor: "#808080",
      labelSize: 20,
      edgeLabelSize: 20,
      edgeLabelColor: { color: "#000" },
    });

    if (sigma) {
      sigma.getCamera().setState({ ratio: 1.25 });
      sigma.getCamera().x = 0.5;
      sigma.getCamera().y = 0.5;
    }

    // Custom event to handle right click on canvas
    sigma.on("rightClickStage", (e: SigmaStageEventPayload) => {
      rigthClick(e, sigma, graph);
    });

    // Custom event to handle dragging
    sigma.on("downNode", (e) => {
      setIsDragging(true);
      setDraggedNode(e.node);
      graph.setNodeAttribute(e.node, "highlighted", true);
      if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
    });

    sigma.getMouseCaptor().on("mousemovebody", (event) => {
      if (!isDragging || !draggedNode) return;

      sigma.getCamera().disable();

      // Get new position of node
      const pos = sigma.viewportToGraph({ x: event.x, y: event.y });

      graph.setNodeAttribute(draggedNode, "x", pos.x);
      graph.setNodeAttribute(draggedNode, "y", pos.y);

      // Prevent sigma to move camera:
      event.preventSigmaDefault();
      event.original.preventDefault();
      event.original.stopPropagation();
    });

    const handleUp = () => {
      console.log("up", draggedNode);
      if (draggedNode) {
        graph.setNodeAttribute(draggedNode, "highlighted", false);
      }
      setIsDragging(false);
      setDraggedNode(null);
      sigma.getCamera().enable();
    };

    sigma.getMouseCaptor().on("mouseup", handleUp);

    return () => {
      sigma.kill();
    };
  }, [
    graph,
    addNode,
    addEdge,
    clearGraph,
    isDragging,
    draggedNode,
    firstRender,
  ]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen"
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default GraphComponent;
