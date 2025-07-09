import GraphComponent from "./components/GraphComponent";
import BottomToolBar from "./components/BottomToolBar";
import TabsSwitcher from "./components/TabsSwitcher";
import GraphSidebar from "./components/GraphSidebar";
import { GraphProvider } from "./context/GraphContext.js";
import { useState } from "react";
import InfoTab from "./components/InfoTab";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { ButtonVariants } from "./components/utils/consts";
import { ChevronRightIcon, Menu } from "lucide-react";
import { useTraining } from "./context/TrainingContext";
import TrainingSidebar from "./components/TrainingSidebar";

const AppContent = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { editationMode } = useTraining();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const toggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  return (
    <>
      <GraphComponent isSideBarVisible={isSidebarVisible} />
      <TabsSwitcher />
      {editationMode ? (
        <>
          <Button
            onClick={toggleSidebar}
            className="absolute right-5 top-5 z-50 h-9 w-[38px] rounded-md border border-input bg-white p-2 text-black shadow-md"
            variant={ButtonVariants.OUTLINE}
          >
            {isSidebarVisible ? <ChevronRightIcon /> : <Menu />}
          </Button>
          <GraphSidebar isVisible={isSidebarVisible} />
        </>
      ) : (
        <TrainingSidebar />
      )}
      <BottomToolBar
        handleInfoClick={toggleInfo}
        openSidebar={() => setIsSidebarVisible(true)}
        showInfo={showInfo}
      />
      {showInfo && <InfoTab />}
    </>
  );
};

function App() {
  return (
    <div className="relative">
      <GraphProvider>
        <AppContent />
      </GraphProvider>
      <Toaster />
    </div>
  );
}

export default App;
