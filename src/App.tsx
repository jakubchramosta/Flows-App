import GraphComponent from "./components/GraphComponent.js";
import { GraphProvider } from "./context/GraphContext.js";

function App() {
  return (
    <>
      <GraphProvider>
        <GraphComponent />
      </GraphProvider>
    </>
  );
}

export default App;
