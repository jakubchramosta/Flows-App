import GraphComponent from "./components/graphComponent";
import BottomToolBar from "./components/bottomToolBar";
import GraphTabs from "./components/graphTabs";
import TopRightMenu from "./components/topRightMenu";
import { GraphProvider } from "./context/GraphContext.js";
import { useState } from "react";
import InfoTab from "./components/InfoTab";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [currentGraph, setCurrentGraph] = useState("default");

  const handleInfoClick = (e: any) => {
    setShowInfo(true);
  };

  return (
    <>
      <GraphProvider>
        <GraphComponent />
        <GraphTabs />
        <TopRightMenu />
        <BottomToolBar handleInfoClick={handleInfoClick} />
        {showInfo && <InfoTab setShowInfo={setShowInfo} />}
      </GraphProvider>
    </>
  );
}

export default App;
