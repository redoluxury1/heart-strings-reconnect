
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { InterfaceProvider } from "./components/common/InterfaceProvider";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
import HouseholdSubcategories from "./pages/HouseholdSubcategories";
import HouseholdSubcategoryDetails from "./pages/HouseholdSubcategoryDetails";
import MoneySubcategories from "./pages/MoneySubcategories";
import MoneySubcategoryDetails from "./pages/MoneySubcategoryDetails";
import FeelingDismissedSubcategories from "./pages/FeelingDismissedSubcategories";
import FeelingDismissedSubcategoryDetails from "./pages/FeelingDismissedSubcategoryDetails";
import InLawsSubcategories from "./pages/InLawsSubcategories";
import InLawsSubcategoryDetails from "./pages/InLawsSubcategoryDetails";
import FeelingUnseenSubcategories from "./pages/FeelingUnseenSubcategories";
import FeelingUnseenSubcategoryDetails from "./pages/FeelingUnseenSubcategoryDetails";
import CommunicationSubcategories from "./pages/CommunicationSubcategories";
import CommunicationSubcategoryDetails from "./pages/CommunicationSubcategoryDetails";
import BoundariesSubcategories from "./pages/BoundariesSubcategories";
import BoundariesSubcategoryDetails from "./pages/BoundariesSubcategoryDetails";
import { useAuth } from "./contexts/AuthContext";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    // Show loading state while checking auth
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const AppContent = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />
      <Route path="/during-conflict" element={
        <ProtectedRoute>
          <MidFight />
        </ProtectedRoute>
      } />
      <Route path="/post-conflict" element={
        <ProtectedRoute>
          <PostConflict />
        </ProtectedRoute>
      } />
      <Route path="/reconnect" element={
        <ProtectedRoute>
          <Reconnect />
        </ProtectedRoute>
      } />
      <Route path="/love-notes" element={
        <ProtectedRoute>
          <LoveNotesReceived />
        </ProtectedRoute>
      } />
      <Route path="/love-code-quiz" element={
        <ProtectedRoute>
          <LoveCodeQuiz />
        </ProtectedRoute>
      } />
      <Route path="/personality-quiz" element={
        <ProtectedRoute>
          <PersonalityQuiz />
        </ProtectedRoute>
      } />
      <Route path="/archive" element={
        <ProtectedRoute>
          <Archive />
        </ProtectedRoute>
      } />
      <Route path="/games" element={<Games />} />
      <Route path="/invite" element={<PartnerInvite />} />
      <Route path="/bridge-the-gap/categories" element={
        <ProtectedRoute>
          <BridgeTheGapCategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/:categoryId" element={
        <ProtectedRoute>
          <BridgeTheGapCategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/parenting" element={
        <ProtectedRoute>
          <ParentingSubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/parenting/:subcategoryId" element={
        <ProtectedRoute>
          <ParentingSubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/intimacy" element={
        <ProtectedRoute>
          <IntimacySubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/intimacy/:subcategoryId" element={
        <ProtectedRoute>
          <IntimacySubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/household-duties" element={
        <ProtectedRoute>
          <HouseholdSubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/household-duties/:subcategoryId" element={
        <ProtectedRoute>
          <HouseholdSubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/money" element={
        <ProtectedRoute>
          <MoneySubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/money/:subcategoryId" element={
        <ProtectedRoute>
          <MoneySubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/feeling-dismissed" element={
        <ProtectedRoute>
          <FeelingDismissedSubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/feeling-dismissed/:subcategoryId" element={
        <ProtectedRoute>
          <FeelingDismissedSubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/in-laws" element={
        <ProtectedRoute>
          <InLawsSubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/in-laws/:subcategoryId" element={
        <ProtectedRoute>
          <InLawsSubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/feeling-unseen" element={
        <ProtectedRoute>
          <FeelingUnseenSubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/feeling-unseen/:subcategoryId" element={
        <ProtectedRoute>
          <FeelingUnseenSubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/communication" element={
        <ProtectedRoute>
          <CommunicationSubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/communication/:subcategoryId" element={
        <ProtectedRoute>
          <CommunicationSubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/boundaries" element={
        <ProtectedRoute>
          <BoundariesSubcategories />
        </ProtectedRoute>
      } />
      <Route path="/bridge-the-gap/categories/boundaries/:subcategoryId" element={
        <ProtectedRoute>
          <BoundariesSubcategoryDetails />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <InterfaceProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" closeButton={true} />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </InterfaceProvider>
  </QueryClientProvider>
);

export default App;
