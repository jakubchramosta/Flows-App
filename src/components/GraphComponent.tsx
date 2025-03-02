import GraphContext from "../context/GraphContext";
import { useEffect, useRef, useContext } from "react";
import Sigma from "sigma";

const GraphComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { graph, addNode, addEdge, clearGraph } = useContext(GraphContext);

  useEffect(() => {
    if (!containerRef.current) return;

    addNode("a", { label: "A", x: 0, y: 0, size: 10 });
    addNode("b", { label: "B", x: 1, y: 1, size: 10 });
    addNode("c", { label: "C", x: 2, y: 2, size: 10 });
    addNode("d", { label: "D", x: 2, y: 2, size: 10 });
    addEdge("a", "b");
    addEdge("b", "c");

    const renderer = new Sigma(graph, containerRef.current);

    //TODO: make it that the coords of the node coresponds with coords of the click
    const handleRightClick = (event: MouseEvent) => {
      const pos = renderer.viewportToGraph(event);
      event.preventDefault();
      const coordForGraph = renderer.viewportToGraph({
        x: event.x,
        y: event.y,
      });

      const node = {
        ...coordForGraph,
        size: 10,
      };
      const id = `node-${Date.now()}`;
      addNode(id, node);
    };

    containerRef.current.addEventListener("contextmenu", handleRightClick);

    return () => {
      clearGraph();
      renderer.kill();
      containerRef.current!.removeEventListener(
        "contextmenu",
        handleRightClick,
      );
    };
  }, [graph, addNode, addEdge, clearGraph]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default GraphComponent;
