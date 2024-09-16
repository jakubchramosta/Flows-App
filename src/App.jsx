import { useState } from "react";
import SidebarMenu from "./components/SidebarMenu.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SidebarMenu />
    </>
  );
}

export default App;
