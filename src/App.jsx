import { useState } from "react";
import SidebarMenu from "./components/SidebarMenu.jsx";
import Graph from "./components/Graph.jsx";

function App() {
  return (
    <>
      <div className="flex">
        <SidebarMenu />
        <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
          <Graph />
        </div>
      </div>
    </>
  );
}

export default App;
