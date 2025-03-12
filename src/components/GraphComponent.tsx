import GraphContext from "../context/GraphContext";
import { useEffect, useRef, useContext, useState } from "react";
import Sigma from "sigma";
import { SigmaStageEventPayload } from "sigma/sigma";
import { useDrawDefaultGraph } from "../hooks/useDrawDefaultGraph";
import { handleRightClick } from "../hooks/hadleRightClick";

const GraphComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { graph, addNode, addEdge, clearGraph } = useContext(GraphContext);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [firstRender, setFirstRender] = useState(true);

  if (firstRender) {
    clearGraph();
    console.log("draw default graph");
    useDrawDefaultGraph(graph);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    setFirstRender(false);

    const sigma = new Sigma(graph, containerRef.current);

    sigma.on("rightClickStage", (e: SigmaStageEventPayload) => {
      handleRightClick(e, sigma, graph);
    });

    sigma.on("downNode", (e) => {
      setIsDragging(true);
      setDraggedNode(e.node);
      graph.setNodeAttribute(e.node, "highlighted", true);
      if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
    });

    sigma.getMouseCaptor().on("mousemovebody", (event) => {
      if (!isDragging || !draggedNode) return;

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
    };

    sigma.getMouseCaptor().on("mouseup", handleUp);

    return () => {
      // if uncommented -> breaks the app
      // clearGraph();
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
      style={{ width: "100%", height: "100%" }}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default GraphComponent;
