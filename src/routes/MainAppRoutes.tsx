import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import Index from "@/pages/Index";
import OnboardingIntro from "@/pages/OnboardingIntro";
import SignupChoice from "@/pages/SignupChoice";
import Onboarding from "@/pages/Onboarding";
import MidFight from "@/pages/MidFight";
import PostConflict from "@/pages/PostConflict";
import Reconnect from "@/pages/Reconnect";
import LoveNotesReceived from "@/pages/LoveNotesReceived";
import Archive from "@/pages/Archive";
import Games from "@/pages/Games";
import PartnerInvite from "@/pages/PartnerInvite";
import LoveCodeQuiz from "@/pages/LoveCodeQuiz";
import PersonalityQuiz from "@/pages/PersonalityQuiz";
import NotFound from "@/pages/NotFound";

const MainAppRoutes = () => {
  return (
    <>
      <Route key="index" path="/" element={<Index />} />
      <Route key="intro" path="/intro" element={<OnboardingIntro />} />
      <Route key="signup-choice" path="/signup-choice" element={<SignupChoice />} />
      <Route key="onboarding" path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />
      
      {/* Feature pages - accessible to authenticated users but content is gated */}
      <Route key="during-conflict" path="/during-conflict" element={
        <ProtectedRoute>
          <MidFight />
        </ProtectedRoute>
      } />
      <Route key="post-conflict" path="/post-conflict" element={
        <ProtectedRoute>
          <PostConflict />
        </ProtectedRoute>
      } />
      <Route key="reconnect" path="/reconnect" element={
        <ProtectedRoute>
          <Reconnect />
        </ProtectedRoute>
      } />
      
      {/* Other protected routes */}
      <Route key="love-notes" path="/love-notes" element={
        <ProtectedRoute>
          <LoveNotesReceived />
        </ProtectedRoute>
      } />
      <Route key="love-code-quiz" path="/love-code-quiz" element={
        <ProtectedRoute>
          <LoveCodeQuiz />
        </ProtectedRoute>
      } />
      <Route key="personality-quiz" path="/personality-quiz" element={
        <ProtectedRoute>
          <PersonalityQuiz />
        </ProtectedRoute>
      } />
      <Route key="archive" path="/archive" element={
        <ProtectedRoute>
          <Archive />
        </ProtectedRoute>
      } />
      <Route key="games" path="/games" element={<Games />} />
      <Route key="invite" path="/invite" element={<PartnerInvite />} />
      <Route key="not-found" path="*" element={<NotFound />} />
    </>
  );
};

export default MainAppRoutes;
