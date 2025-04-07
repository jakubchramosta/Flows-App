import GraphContext from "../context/GraphContext";
import { useEffect, useRef, useContext, useState } from "react";
import Sigma from "sigma";
import { useDrawDefaultGraph } from "../hooks/useDrawDefaultGraph";
import { useHandleClicks } from "../hooks/useHadleClicks";
import { SigmaStageEventPayload } from "sigma/dist/declarations/src/types";
import ContextMenu from "./ContextMenu";

const GraphComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { graph, addNode, addEdge, clearGraph } = useContext(GraphContext);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [firstRender, setFirstRender] = useState(true);
  const { doubleClick } = useHandleClicks();
  const [isNode, setIsNode] = useState(true);
  const [id, setId] = useState<string | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  if (firstRender) {
    clearGraph();
    useDrawDefaultGraph(graph);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    setFirstRender(false);

    const sigma = new Sigma(graph, containerRef.current, {
      maxCameraRatio: 3,
      minCameraRatio: 0.5,
      defaultNodeColor: "#0091ff",
      defaultEdgeType: "arrow",
      renderEdgeLabels: true,
      defaultEdgeColor: "#ccc",
      enableEdgeEvents: true,
      minEdgeThickness: 5,
      labelSize: 20,
      edgeLabelSize: 20,
      edgeLabelColor: { color: "#000" },
    });

    if (sigma) {
      sigma.getCamera().setState({ ratio: 1.25 });
      sigma.getCamera().x = 0.5;
      sigma.getCamera().y = 0.5;
    }

    // Custom event to handle double LMB click on canvas
    sigma.on("doubleClickStage", (e: SigmaStageEventPayload) => {
      doubleClick(e, sigma, graph);
    });

    // Custom event to handle dragging
    sigma.on("downNode", (e) => {
      console.log("downNode", e);
      console.log("isMenuOpen", isMenuOpen);
      if (e.event.original.button === 2) return;
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
      console.log("hadleUp");
      if (draggedNode) {
        graph.setNodeAttribute(draggedNode, "highlighted", false);
      }
      setIsDragging(false);
      setDraggedNode(null);
      sigma.getCamera().enable();
    };

    sigma.on("upNode", handleUp);
    sigma.on("upStage", handleUp);
    sigma.getMouseCaptor().on("mouseup", () => console.log("mouseup"));

    ////////////////////////////////////////////////////////////////////////
    sigma.on("rightClickNode", (e) => {
      console.log("rightClickNode", e);
      setIsNode(true);
      // e.preventSigmaDefault();
      e.event.original.preventDefault();
      setIsMenuOpen(true);
      setMenuPosition({ x: e.event.x, y: e.event.y });
    });

    sigma.on("rightClickEdge", (e) => {
      console.log("rightClickEdge", e);
      setId(e.edge);
      setIsNode(false);
      // e.preventSigmaDefault();
      e.event.original.preventDefault();
      setIsMenuOpen(true);
      setMenuPosition({ x: e.event.x, y: e.event.y });
    });
    ///////////////////////////////////////////////////////////////////////

    console.log("rendering sigma");

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
    <>
      <ContextMenu
        isOpen={isMenuOpen}
        position={menuPosition}
        setIsOpen={setIsMenuOpen}
        isNode={isNode}
        id={id}
      />
      <div
        ref={containerRef}
        className="h-screen w-screen"
        onContextMenu={(e) => e.preventDefault()}
      />
    </>
  );
};

export default GraphComponent;
