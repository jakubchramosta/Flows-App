import BottomToolBar from "./components/BottomToolBar.js";
import GraphComponent from "./components/GraphComponent.js";
import { Button } from "./components/ui/button.js";
import { GraphProvider } from "./context/GraphContext.js";
import { PlusIcon } from "lucide-react";

function App() {
  return (
    <>
      <GraphProvider>
        <GraphComponent />
      </GraphProvider>
      <div className="absolute left-6 top-6 flex">
        <Button variant={"outline"} size={"icon"}>
          <PlusIcon />
        </Button>
      </div>
      <BottomToolBar />
    </>
  );
}

export default App;
