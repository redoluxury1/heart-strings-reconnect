
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { InterfaceProvider } from "./components/common/InterfaceProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoveNotesReceived from "./pages/LoveNotesReceived";
import MidFight from "./pages/MidFight";
import PostConflict from "./pages/PostConflict";
import LoveCodeQuiz from "./pages/LoveCodeQuiz";
import Archive from "./pages/Archive";
import Games from "./pages/Games";
import PartnerInvite from "./pages/PartnerInvite";
import Onboarding from "./pages/Onboarding";
import Reconnect from "./pages/Reconnect";
import PersonalityQuiz from "./pages/PersonalityQuiz";
import BridgeTheGapCategories from "./pages/BridgeTheGapCategories";
import BridgeTheGapCategoryDetails from "./pages/BridgeTheGapCategoryDetails";
import ParentingSubcategories from "./pages/ParentingSubcategories";
import ParentingSubcategoryDetails from "./pages/ParentingSubcategoryDetails";
import IntimacySubcategories from "./pages/IntimacySubcategories";
import IntimacySubcategoryDetails from "./pages/IntimacySubcategoryDetails";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <InterfaceProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton={true} />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/during-conflict" element={<MidFight />} />
            <Route path="/post-conflict" element={<PostConflict />} />
            <Route path="/reconnect" element={<Reconnect />} />
            <Route path="/love-notes" element={<LoveNotesReceived />} />
            <Route path="/love-code-quiz" element={<LoveCodeQuiz />} />
            <Route path="/personality-quiz" element={<PersonalityQuiz />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/games" element={<Games />} />
            <Route path="/invite" element={<PartnerInvite />} />
            <Route path="/bridge-the-gap/categories" element={<BridgeTheGapCategories />} />
            <Route path="/bridge-the-gap/categories/:categoryId" element={<BridgeTheGapCategoryDetails />} />
            <Route path="/bridge-the-gap/categories/parenting" element={<ParentingSubcategories />} />
            <Route path="/bridge-the-gap/categories/parenting/:subcategoryId" element={<ParentingSubcategoryDetails />} />
            <Route path="/bridge-the-gap/categories/intimacy" element={<IntimacySubcategories />} />
            <Route path="/bridge-the-gap/categories/intimacy/:subcategoryId" element={<IntimacySubcategoryDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </InterfaceProvider>
  </QueryClientProvider>
);

export default App;
