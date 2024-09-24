import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const Graph = () => {
  const cyRef = useRef(null);

  useEffect(() => {
    // Inicializace Cytoscape
    const cy = cytoscape({
      container: cyRef.current, // HTML element pro graf
      elements: [
        // Definice uzlů a hran
        { data: { id: "a" } },
        { data: { id: "b" } },
        { data: { id: "c" } },
        { data: { source: "a", target: "b" } },
        { data: { source: "b", target: "c" } },
      ],
      style: [
        // Definice stylů uzlů a hran
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
        // Layout grafu
        name: "grid",
        rows: 1,
      },
    });

    // Vyčištění instance cytoscape při odpojení komponenty
    return () => cy.destroy();
  }, []);

  return <div ref={cyRef} style={{ width: "600px", height: "400px" }} />;
};

export default Graph;
