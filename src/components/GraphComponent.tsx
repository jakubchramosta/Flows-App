import GraphContext from "../context/GraphContext";
import { useEffect, useRef, useContext, useState } from "react";
import Sigma from "sigma";
import { useDrawDefaultGraph } from "../hooks/useDrawDefaultGraph";
import { useHandleClicks } from "../hooks/useHadleClicks";
import { SigmaStageEventPayload } from "sigma/dist/declarations/src/types";
import ContextMenu from "./ContextMenu";
import { edgeReducer } from "./utils/edgeReducer";
import EdgeCapacityInput from "./EdgeCapacityInput";
import { GraphTypes } from "./utils/consts";
import { toast } from "sonner";
import { EdgeCurvedArrowProgram } from "@sigma/edge-curve";

interface GraphComponentProps {
  isSideBarVisible: boolean;
}

const GraphComponent = ({ isSideBarVisible }: GraphComponentProps) => {
  // Reference to the container div for rendering the graph
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    graph,
    graphs,
    addNode,
    addEdge,
    clearGraph,
    firstNodeInEdge,
    setAddingEdgeMode,
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
  const [inputIsOpen, setInputIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Clear the graph and draw the default graph on the first render
  if (firstRender) {
    graph.clear();
    useDrawDefaultGraph(graphs[0], GraphTypes.CYCLE);
    console.log(graphs[0]);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    setFirstRender(false);

    // Initialize Sigma instance with custom settings
    const sigma = new Sigma(graph, containerRef.current, {
      // maxCameraRatio: 3,
      // minCameraRatio: 0.5,
      defaultNodeColor: "#0091ff",
      defaultEdgeType: "arrow",
      renderEdgeLabels: true,
      defaultEdgeColor: "#ccc",
      enableEdgeEvents: true,
      minEdgeThickness: 13,
      labelSize: 20,
      edgeLabelSize: 20,
      edgeLabelColor: { color: "#000" },
      edgeReducer: edgeReducer,
      cameraPanBoundaries: true,
      edgeProgramClasses: {
        curved: EdgeCurvedArrowProgram,
      },
    });

    // Set initial camera state depending on the sidebar visibility
    if (sigma) {
      sigma.getCamera().setState({
        ratio: 1.45,
        x: isSideBarVisible ? 0.7 : 0.5,
        y: 0.5,
      });
    }

    // Handle double left mouse button click on the canvas
    sigma.on("doubleClickStage", (e: SigmaStageEventPayload) => {
      doubleClick(e, sigma, graph);
    });

    //Handle adding edges on click
    sigma.on("clickNode", (e) => {
      if (
        // @ts-ignore
        (e.event.original.button === 2 && !addingEdgeMode) ||
        !firstNodeInEdge
      )
        return;

      if (firstNodeInEdge === e.node) {
        toast.error("Nelze přidat hranu na stejný bod.");
        return;
      }

      if (graph.hasEdge(firstNodeInEdge, e.node)) {
        toast.error("Hrana již existuje. Vyberte jiný bod.");
        return;
      }

      addEdge(firstNodeInEdge, e.node);
      setAddingEdgeMode(false); // Exit adding edge mode
    });

    // Handle dragging of nodes
    sigma.on("downNode", (e) => {
      console.log("downNode", e.node);
      // @ts-ignore
      if (e.event.original.button === 2) return; // Ignore right-click
      if (addingEdgeMode) return;
      setIsDragging(true);
      setDraggedNode(e.node);
      graph.setNodeAttribute(e.node, "highlighted", true);
      if (!sigma.getCustomBBox()) {
        sigma.setCustomBBox(sigma.getBBox());
        console.log("Custom BBox set");
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

    // Handle right-click on a node
    sigma.on("rightClickNode", (e) => {
      setId(e.node);
      setIsNode(true);
      e.event.original.preventDefault();
      setIsMenuOpen(true);
      setMenuPosition({ x: e.event.x, y: e.event.y });
    });

    // Handle right-click on an edge
    sigma.on("rightClickEdge", (e) => {
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
        setInputMenuOpen={setInputIsOpen}
        isNode={isNode}
        id={id}
      />
      {/* Edge capacity input */}
      {inputIsOpen && (
        <EdgeCapacityInput
          position={menuPosition}
          setIsOpen={setInputIsOpen}
          id={id}
        />
      )}
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
