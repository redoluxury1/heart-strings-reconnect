import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import { PageSubscriptionGate } from "@/components/subscription/PageSubscriptionGate";
import { FEATURE_KEYS } from "@/services/subscriptionService";
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
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

import CommunicationAnalysis from "@/pages/CommunicationAnalysis";
import NotFound from "@/pages/NotFound";
import SettingsPage from "@/pages/Settings";
import Features from "@/pages/Features";

const MainAppRoutes = () => {
  console.log('MainAppRoutes is being called');
  return (
    <>
      <Route key="index" path="/" element={<Index />} />
      <Route key="features" path="/features" element={<Features />} />
      <Route key="privacy" path="/privacy" element={<Privacy />} />
      <Route key="terms" path="/terms" element={<Terms />} />
      <Route key="intro" path="/intro" element={<OnboardingIntro />} />
      <Route key="signup-choice" path="/signup-choice" element={<SignupChoice />} />
      <Route key="onboarding" path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />
      
      {/* Feature pages - now protected at page level */}
      <Route key="during-conflict" path="/during-conflict" element={
        <PageSubscriptionGate 
          featureKey={FEATURE_KEYS.MID_FIGHT_ACCESS}
          pageName="Mid-Fight Tools"
          pageDescription="Access powerful tools to pause, communicate better, and reconnect during conflicts. Includes the Code Word timer, conversation guides, and healing exercises."
        >
          <MidFight />
        </PageSubscriptionGate>
      } />
      <Route key="post-conflict" path="/post-conflict" element={
        <PageSubscriptionGate 
          featureKey={FEATURE_KEYS.POST_CONFLICT_ACCESS}
          pageName="Post-Conflict Reflection"
          pageDescription="Process what happened with guided reflection tools, understand underlying needs, and strengthen your relationship through intentional healing."
        >
          <PostConflict />
        </PageSubscriptionGate>
      } />
      <Route key="reconnect" path="/reconnect" element={
        <PageSubscriptionGate 
          featureKey={FEATURE_KEYS.RECONNECT_ACCESS}
          pageName="Reconnection Tools"
          pageDescription="Rebuild intimacy and connection with activities designed to bring you closer together and reignite the spark in your relationship."
        >
          <Reconnect />
        </PageSubscriptionGate>
      } />
      
      {/* Other protected routes that require premium subscription */}
      <Route key="love-notes" path="/love-notes" element={
        <PageSubscriptionGate 
          featureKey={FEATURE_KEYS.LOVE_NOTES_ACCESS}
          pageName="Love Notes"
          pageDescription="Exchange heartfelt messages with your partner. Express appreciation, love, and connection through thoughtful notes."
        >
          <LoveNotesReceived />
        </PageSubscriptionGate>
      } />
      <Route key="archive" path="/archive" element={
        <PageSubscriptionGate 
          featureKey={FEATURE_KEYS.ARCHIVE_ACCESS}
          pageName="Saved Archive"
          pageDescription="Access your saved conversations, reflections, repair plans, and progress. Review your relationship journey and growth over time."
        >
          <Archive />
        </PageSubscriptionGate>
      } />
      <Route key="games" path="/games" element={<Games />} />
      <Route key="communication-analysis" path="/communication-analysis" element={<CommunicationAnalysis />} />
      <Route key="invite" path="/invite" element={<PartnerInvite />} />
      <Route key="settings" path="/settings" element={<SettingsPage />} />
      <Route key="not-found" path="*" element={<NotFound />} />
    </>
  );
};

export default MainAppRoutes;
