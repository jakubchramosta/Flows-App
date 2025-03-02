import GraphContext from "../context/GraphContext";
import { useEffect, useRef, useContext } from "react";
import Sigma from "sigma";
import { SigmaStageEventPayload } from "sigma/sigma";
//import ForceSupervisor from "graphology-layout-force/worker";

const GraphComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { graph, addNode, addEdge, clearGraph } = useContext(GraphContext);

  useEffect(() => {
    if (!containerRef.current) return;

    addNode("a", { label: "A", x: 0, y: 0, size: 10 });
    addNode("b", { label: "B", x: 1, y: 1, size: 10 });
    addNode("c", { label: "C", x: 1, y: -1, size: 10 });
    addNode("d", { label: "D", x: -1, y: -1, size: 10 });
    addNode("f", { label: "F", x: -1, y: 1, size: 10 });

    // const layout = new ForceSupervisor(graph, {
    //   isNodeFixed: (_, attr) => attr.highlighted,
    // });
    // layout.start();

    const renderer = new Sigma(graph, containerRef.current);

    //TODO: make it that the coords of the node coresponds with coords of the click
    const handleRightClick = (event: SigmaStageEventPayload) => {
      //const pos = renderer.viewportToGraph(event);

      console.log("evet:" + event.event.x + " " + event.event.y);

      event.preventSigmaDefault();
      const coordForGraph = renderer.viewportToGraph({
        x: event.event.x,
        y: event.event.y,
      });

      console.log(
        "renderer.viewportToGraph:" + coordForGraph.x + " " + coordForGraph.y,
      );

      const node = {
        ...coordForGraph,
        size: 10,
      };
      const id = `node-${Date.now()}`;
      addNode(id, node);
    };

    renderer.on("rightClickStage", handleRightClick);

    return () => {
      clearGraph();
      renderer.kill();
    };
  }, [graph, addNode, addEdge, clearGraph]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default GraphComponent;
