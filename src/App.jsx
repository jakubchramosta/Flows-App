import { useState } from "react";
import SidebarMenu from "./components/SidebarMenu.jsx";
import Graph from "./components/Graph.jsx";

function App() {
  return (
    <>
      <div className="flex">
        <SidebarMenu />
        <div
          style={{
            width: "50vw",
            height: "50vh",
            display: "flex",
            border: "1px solid black",
          }}
        >
          <Graph />
        </div>
      </div>
    </>
  );
}

export default App;
