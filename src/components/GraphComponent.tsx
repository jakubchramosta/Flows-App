import { useContext, useEffect, useRef, useState } from "react";
import Sigma from "sigma";
import ForceSupervisor from "graphology-layout-force/worker";
import { GraphContext } from "../context/GraphContext";
import { useDrawDefaultGraph } from "../hooks/useDrawDefaultGraph";

const GraphComponent = () => {
  const graph = useContext(GraphContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [firstRender, setFirstRender] = useState(true);

  if (firstRender) {
    graph.clear();
    useDrawDefaultGraph(graph);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    setFirstRender(false);

    const sigma = new Sigma(graph, containerRef.current, {
      minCameraRatio: 0.5,
      maxCameraRatio: 2,
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
      sigma.kill();
    };
  }, [isDragging, draggedNode, graph, firstRender]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default GraphComponent;
