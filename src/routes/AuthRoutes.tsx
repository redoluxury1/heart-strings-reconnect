
import { Route } from "react-router-dom";
import Auth from "@/pages/Auth";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

const AuthRoutes = () => (
  <>
    <Route path="/auth" element={<Auth />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />
  </>
);

export default AuthRoutes;
