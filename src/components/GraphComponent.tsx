import React, { useEffect, useRef } from "react";
import Sigma from "sigma";
import Graph from "graphology";

const GraphComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const graph = new Graph();
    graph.addNode("a", { label: "A", x: 0, y: 0, size: 10 });
    graph.addNode("b", { label: "B", x: 1, y: 1, size: 10 });
    graph.addNode("c", { label: "C", x: 2, y: 2, size: 10 });
    graph.addEdge("a", "b");
    graph.addEdge("b", "c");

    const sigma = new Sigma(graph, containerRef.current);

    return () => {
      sigma.kill();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default GraphComponent;
