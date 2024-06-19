import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Page } from "./_Page";

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Page />
    </QueryClientProvider>
  );
}

export default App;
