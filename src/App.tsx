import GraphComponent from "./components/GraphComponent";
import BottomToolBar from "./components/BottomToolBar";
import TabsSwitcher from "./components/TabsSwitcher";
import GraphSidebar from "./components/GraphSidebar";
import { GraphProvider } from "./context/GraphContext.js";
import { useState } from "react";
import InfoTab from "./components/InfoTab";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [currentGraph, setCurrentGraph] = useState("default");

  const handleInfoClick = (e: any) => {
    setShowInfo(true);
  };

  return (
    <div className="relative">
      <GraphProvider>
        <GraphComponent />
        <TabsSwitcher />
        <GraphSidebar />
        <BottomToolBar handleInfoClick={handleInfoClick} />
        {showInfo && <InfoTab setShowInfo={setShowInfo} />}
      </GraphProvider>
      <Toaster />
    </div>
  );
}

export default App;
