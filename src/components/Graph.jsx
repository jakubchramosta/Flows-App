import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const Graph = () => {
  const cyRef = useRef(null);

  useEffect(() => {
    //Cytoscape Initialization
    const cy = cytoscape({
      container: cyRef.current, // HTML element for graph
      elements: [
        // Definition of nodes and edges
        { data: { id: "a" } },
        { data: { id: "b" } },
        { data: { id: "c" } },
        { data: { source: "a", target: "b" } },
        { data: { source: "b", target: "c" } },
      ],
      style: [
        // Definition of the style of nodes and edges
        {
          selector: "node",
          style: {
            "background-color": "#0074D9",
            label: "data(id)",
          },
        },
        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#0074D9",
            "target-arrow-color": "#0074D9",
            "target-arrow-shape": "triangle",
          },
        },
      ],
      layout: {
        name: "grid",
        rows: 1,
        fit: true,
        padding: 50,
      },
    });

    //Clearing of instance cytospace if component is detached
    return () => cy.destroy();
  }, []);

  return <div ref={cyRef} style={{ width: "100%", height: "100%" }} />;
};

export default Graph;
