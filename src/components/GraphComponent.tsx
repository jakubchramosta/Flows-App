import GraphContext from "../context/GraphContext";
import { useEffect, useRef, useContext, useState } from "react";
import Sigma from "sigma";
import { useDrawDefaultGraph } from "../hooks/useDrawDefaultGraph";
import { useHandleClicks } from "../hooks/useHadleClicks";
import { SigmaStageEventPayload } from "sigma/dist/declarations/src/types";
import ContextMenu from "./ContextMenu";

const GraphComponent = () => {
  // Reference to the container div for rendering the graph
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    graph,
    addNode,
    addEdge,
    clearGraph,
    firstNodeInEdge,
    addingEdgeMode,
  } = useContext(GraphContext);

  // State variables for dragging, context menu, and rendering
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [firstRender, setFirstRender] = useState(true);
  const { doubleClick } = useHandleClicks();
  const [isNode, setIsNode] = useState(true);
  const [id, setId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Clear the graph and draw the default graph on the first render
  if (firstRender) {
    clearGraph();
    useDrawDefaultGraph(graph);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    setFirstRender(false);

    // Initialize Sigma instance with custom settings
    const sigma = new Sigma(graph, containerRef.current, {
      maxCameraRatio: 3,
      minCameraRatio: 0.5,
      defaultNodeColor: "#0091ff",
      defaultEdgeType: "arrow",
      renderEdgeLabels: true,
      defaultEdgeColor: "#ccc",
      enableEdgeEvents: true,
      minEdgeThickness: 13,
      labelSize: 20,
      edgeLabelSize: 20,
      edgeLabelColor: { color: "#000" },
    });

    // Set initial camera state
    if (sigma) {
      sigma.getCamera().setState({ ratio: 1.25 });
      sigma.getCamera().x = 0.5;
      sigma.getCamera().y = 0.5;
    }

    // Handle double left mouse button click on the canvas
    sigma.on("doubleClickStage", (e: SigmaStageEventPayload) => {
      doubleClick(e, sigma, graph);
    });

    // Handle dragging of nodes
    sigma.on("downNode", (e) => {
      if (e.event.original.button === 2) return; // Ignore right-click
      setIsDragging(true);
      setDraggedNode(e.node);
      graph.setNodeAttribute(e.node, "highlighted", true);
      if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
    });

    //Handle adding edges on click
    //TODO: implement adding edges
    sigma.on("clickNode", (e) => {
      console.log("clickNode", e.node);
      if (e.event.original.button === 2) return; // Ignore right-click
      console.log("clickNode", e.node);
      console.log("addingEdgeMode", addingEdgeMode);
      if (!addingEdgeMode) return; // Ignore if not in adding edge mode
      if (firstNodeInEdge) {
        console.log("firstNodeInEdge", firstNodeInEdge, e.node);
        addEdge(firstNodeInEdge, e.node);
      }
    });

    // Update node position while dragging
    sigma.getMouseCaptor().on("mousemovebody", (e) => {
      if (!isDragging || !draggedNode) return;

      // Get new position of the node
      const pos = sigma.viewportToGraph({ x: e.x, y: e.y });

      graph.setNodeAttribute(draggedNode, "x", pos.x);
      graph.setNodeAttribute(draggedNode, "y", pos.y);

      // Prevent default camera movement
      sigma.getCamera().disable();
      console.log("disable camera");

      e.preventSigmaDefault();
      e.original.preventDefault();
      e.original.stopPropagation();
    });

    // Handle mouse release after dragging
    containerRef.current.addEventListener("mouseup", (e) => {
      if (isDragging) {
        setIsDragging(false);
        if (draggedNode) {
          graph.setNodeAttribute(draggedNode, "highlighted", false);
        }
      }
    });

    // const handleUp = () => {
    //   console.log("hadleUp");
    //   if (draggedNode) {
    //     graph.setNodeAttribute(draggedNode, "highlighted", false);
    //   }
    //   setIsDragging(false);
    //   setDraggedNode(null);
    //   sigma.getCamera().enable();
    // };

    // sigma.on("upNode", handleUp);
    // sigma.on("upStage", handleUp);
    // sigma.getMouseCaptor().on("mouseup", () => console.log("mouseup"));
    // sigma.getMouseCaptor().on("mouseup", handleUp);

    // Handle right-click on a node
    sigma.on("rightClickNode", (e) => {
      console.log("rightClickNode", e);
      setId(e.node);
      setIsNode(true);
      e.event.original.preventDefault();
      setIsMenuOpen(true);
      setMenuPosition({ x: e.event.x, y: e.event.y });
    });

    // Handle right-click on an edge
    sigma.on("rightClickEdge", (e) => {
      console.log("rightClickEdge", e);
      setId(e.edge);
      setIsNode(false);
      e.event.original.preventDefault();
      setIsMenuOpen(true);
      setMenuPosition({ x: e.event.x, y: e.event.y });
    });

    console.log("rendering sigma");

    // Cleanup Sigma instance on component unmount
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
      {/* Context menu for nodes and edges */}
      <ContextMenu
        isOpen={isMenuOpen}
        position={menuPosition}
        setIsOpen={setIsMenuOpen}
        isNode={isNode}
        id={id}
      />
      {/* Graph container */}
      <div
        ref={containerRef}
        className="w-screen h-screen"
        onContextMenu={(e) => e.preventDefault()} // Disable default context menu
      />
    </>
  );
};

export default GraphComponent;
