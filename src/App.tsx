
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoveNotesReceived from "./pages/LoveNotesReceived";
import MidFight from "./pages/MidFight";
import LoveCodeQuiz from "./pages/LoveCodeQuiz";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/during-conflict" element={<MidFight />} />
          <Route path="/post-conflict" element={<NotFound />} />
          <Route path="/reconnect" element={<NotFound />} />
          <Route path="/love-notes" element={<LoveNotesReceived />} />
          <Route path="/love-code-quiz" element={<LoveCodeQuiz />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
