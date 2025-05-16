
import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
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

const MainAppRoutes = () => (
  <>
    <Route path="/" element={<Index />} />
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
    <Route path="*" element={<NotFound />} />
  </>
);

export default MainAppRoutes;
