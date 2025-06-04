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

const AppContent = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { editationMode } = useTraining();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  /* TODO: 
  hodit Button do GrafInfo nobo spíš udělat komponentu co obsahuje ten 
  Button a GraphInfo 

  udělat novou komponentu skoro stejnou jako graphInfo a bude vidět jen v 
  trenovacim modu a bude permanentně otevřená

  jednotlivé části bottomToolBaru rozsekat na vlastní komponenty (budou 3)
  prostřední se upraví, pravá bude prázdá, levá bude obsahovat jen info button

  udělat přidávání hran na kliknutí (LMB dopředná hrana, RMB zpětná hrana)

  tlačítko co odstranívšechny hrany z cesty uživatele

  tlačítko co odstraní poslení přidanou hranu
  
  tlačítko přidání cesty uživatele do toku

  tlačítko vyhodnocení toku
  */

  return (
    <>
      <GraphComponent isSideBarVisible={isSidebarVisible} />
      <TabsSwitcher />
      <Button
        onClick={toggleSidebar}
        className="absolute right-5 top-5 z-50 h-9 w-[38px] rounded-md border border-input bg-white p-2 text-black shadow-md"
        variant={ButtonVariants.OUTLINE}
      >
        {isSidebarVisible ? <ChevronRightIcon /> : <Menu />}
      </Button>
      <GraphSidebar isVisible={isSidebarVisible} />
      <BottomToolBar
        handleInfoClick={() => setShowInfo(true)}
        openSidebar={() => setIsSidebarVisible(true)}
      />
      {showInfo && <InfoTab setShowInfo={setShowInfo} />}
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
