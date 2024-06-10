import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { ApprovalLine } from "./components";
import { lineAtom } from "./store/line";

function App() {
  const setLine = useSetAtom(lineAtom);

  useEffect(() => {
    setTimeout(() => {
      setLine([
        {
          viewId: `${Math.random()}`,
          actors: [
            { viewId: `${Math.random()}`, name: "Alice", value: "alice" },
            { viewId: `${Math.random()}`, name: "Bob", value: "bob" },
            { viewId: `${Math.random()}`, name: "Charlie", value: "charlie" },
          ],
          step: 0,
          status: "pending",
        },
      ]);
    }, 500);
  }, [setLine]);

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <ApprovalLine />
    </div>
  );
}

export default App;
