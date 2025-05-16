
import { QueryClient } from "@tanstack/react-query";
import AppProviders from "./components/providers/AppProviders";
import AppContent from "./components/routing/AppContent";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <AppProviders queryClient={queryClient}>
    <AppContent />
  </AppProviders>
);

export default App;
