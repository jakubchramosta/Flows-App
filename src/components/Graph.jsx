import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";

const Graph = () => {
  const cyRef = useRef(null);
  const [cyInstance, setCyInstance] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Cytoscape Initialization
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

    setCyInstance(cy);

    // Add event listener for right-click to show context menu
    cy.on("cxttap", (event) => {
      if (event.target === cy) {
        setMenuPosition({
          x: event.originalEvent.clientX,
          y: event.originalEvent.clientY,
        });
        setMenuVisible(true);
      }
    });

    // Hide context menu on click elsewhere
    const handleClick = () => setMenuVisible(false);
    document.addEventListener("click", handleClick);

    // Cleanup event listeners on component unmount
    return () => {
      cy.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const addNode = () => {
    if (cyInstance) {
      const newNodeId = `node${cyInstance.nodes().length + 1}`;
      cyInstance.add({
        group: "nodes",
        data: { id: newNodeId },
        position: { x: menuPosition.x, y: menuPosition.y },
      });
      setMenuVisible(false);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={cyRef} style={{ width: "100%", height: "100%" }} />
      {menuVisible && (
        <div
          style={{
            position: "absolute",
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: "white",
            border: "1px solid black",
            zIndex: 1000,
          }}
        >
          <ul style={{ margin: 0, padding: "10px", listStyle: "none" }}>
            <li onClick={addNode}>Add Node</li>
            <li
              onClick={() => {
                /* Add your menu item action here */
              }}
            >
              Another Action
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Graph;
