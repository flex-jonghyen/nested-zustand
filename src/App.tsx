import { useEffect } from "react";

import { useShallow } from "zustand/react/shallow";
import { ApprovalLine } from "./components";
import { useStore } from "./store/store";

function App() {
  const setLine = useStore(useShallow((state) => state.setLine));

  useEffect(() => {
    setTimeout(() => {
      setLine({
        line: [{ viewId: `${Date.now()}`, actors: [], status: "new", step: 0 }],
      });
    }, 500);
  }, [setLine]);

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <ApprovalLine />
    </div>
  );
}

export default App;
