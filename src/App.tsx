import GraphComponent from "./components/graphComponent";
import BottomToolBar from "./components/bottomToolBar";
import GraphTabs from "./components/graphTabs";
import TopRightMenu from "./components/topRightMenu";
import { GraphProvider } from "./context/GraphContext.js";

function App() {
  return (
    <>
      <GraphProvider>
        <GraphComponent />
        <GraphTabs />
        <TopRightMenu />
        <BottomToolBar />
      </GraphProvider>
    </>
  );
}

export default App;
