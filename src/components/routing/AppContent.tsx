
import { Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import MainAppRoutes from "@/routes/MainAppRoutes";
import AuthRoutes from "@/routes/AuthRoutes";
import BridgeTheGapRoutes from "@/routes/BridgeTheGapRoutes";

const AppContent = () => (
  <>
    <ScrollToTop />
    <Routes>
      {/* Auth Routes */}
      {AuthRoutes()}
      
      {/* Main App Routes */}
      {MainAppRoutes()}
      
      {/* Bridge The Gap Routes */}
      {BridgeTheGapRoutes()}
    </Routes>
  </>
);

export default AppContent;
