
import { Route } from "react-router-dom";
import Auth from "@/pages/Auth";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

// This function returns an array of Route elements
const AuthRoutes = () => [
  <Route key="auth" path="/auth" element={<Auth />} />,
  <Route key="terms" path="/terms" element={<Terms />} />,
  <Route key="privacy" path="/privacy" element={<Privacy />} />
];

export default AuthRoutes;
