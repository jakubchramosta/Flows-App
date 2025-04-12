import GraphComponent from "./components/GraphComponent";
import BottomToolBar from "./components/BottomToolBar";
import GraphTabs from "./components/GraphTabs";
import TopRightMenu from "./components/TopRightMenu";
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
        <GraphTabs />
        <TopRightMenu />
        <BottomToolBar handleInfoClick={handleInfoClick} />
        {showInfo && <InfoTab setShowInfo={setShowInfo} />}
      </GraphProvider>
      <Toaster />
    </div>
  );
}

export default App;
