
import { Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import AuthRoutes from "@/routes/AuthRoutes";
import MainAppRoutes from "@/routes/MainAppRoutes";
import BridgeTheGapRoutes from "@/routes/BridgeTheGapRoutes";

const AppContent = () => (
  <>
    <ScrollToTop />
    <Routes>
      <AuthRoutes />
      <MainAppRoutes />
      <BridgeTheGapRoutes />
    </Routes>
  </>
);

export default AppContent;
