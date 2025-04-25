import GraphComponent from "./components/GraphComponent";
import BottomToolBar from "./components/BottomToolBar";
import TabsSwitcher from "./components/TabsSwitcher";
import GraphSidebar from "./components/GraphSidebar";
import { GraphProvider } from "./context/GraphContext.js";
import { useState } from "react";
import InfoTab from "./components/InfoTab";
import { Toaster } from "./components/ui/sonner";
import { ChevronRightIcon, Menu } from "lucide-react";
import BottomToolBarButton from "./components/BottomToolBarButton";
import { ButtonSizes, ButtonVariants } from "./components/utils/consts";
import { Button } from "./components/ui/button";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <GraphProvider>
        <GraphComponent />
        <TabsSwitcher />
        <Button
          onClick={toggleSidebar}
          className="absolute right-5 top-5 z-50 h-9 w-[38px] rounded-md border border-input bg-white p-2 text-black shadow-md"
          variant={ButtonVariants.OUTLINE}
        >
          {isSidebarVisible ? <ChevronRightIcon /> : <Menu />}
        </Button>
        <GraphSidebar isVisible={isSidebarVisible} />
        <BottomToolBar handleInfoClick={() => setShowInfo(true)} />
        {showInfo && <InfoTab setShowInfo={setShowInfo} />}
      </GraphProvider>
      <Toaster />
    </div>
  );
}

export default App;
