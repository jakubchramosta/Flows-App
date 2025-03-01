import SidebarMenu from "./components/SidebarMenu.js";
import GraphComponent from "./components/GraphComponent.js";

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
          <GraphComponent />
        </div>
      </div>
    </>
  );
}

export default App;
