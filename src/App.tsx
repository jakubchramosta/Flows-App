import GraphComponent from "./components/graphComponent.js";
import BottomToolBar from "./components/bottomToolBar.js";
import GraphTabs from "./components/graphTabs.js";
import TopRightMenu from "./components/topRightMenu.js";
import { GraphProvider } from "./context/GraphContext.js";

function App() {
  return (
    <>
      <GraphProvider>
        <GraphComponent />
      </GraphProvider>
      <GraphTabs />
      <TopRightMenu />
      <BottomToolBar />
    </>
  );
}

export default App;
