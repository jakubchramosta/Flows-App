import SidebarMenu from "./components/SidebarMenu.js";
import GraphComponent from "./components/GraphComponent.js";
import { GraphProvider } from "./context/GraphContext.js";

function App() {
  return (
    <>
      <div className="flex">
        <SidebarMenu />
        <div
          style={{
            width: "50vw",
            height: "50vh",
            display: "flex",
            border: "1px solid black",
          }}
        >
          <GraphProvider>
            <GraphComponent />
          </GraphProvider>
        </div>
      </div>
    </>
  );
}

export default App;
