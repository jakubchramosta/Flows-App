import SidebarMenu from "./components/SidebarMenu.js";
import GraphComponent from "./components/GraphComponent.js";
import { GraphProvider } from "./context/GraphContext.js";

function App() {
  return (
    <>
      <div className="flex">
        <SidebarMenu />
        <div className="flex h-[50vh] w-[50vw] border border-black">
          <GraphProvider>
            <GraphComponent />
          </GraphProvider>
        </div>
      </div>
    </>
  );
}

export default App;
