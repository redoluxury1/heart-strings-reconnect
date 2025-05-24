
import { Route } from "react-router-dom";
import DevTesting from "@/pages/DevTesting";

// This function returns an array of Route elements for development
const DevRoutes = () => [
  <Route key="dev-testing" path="/dev-testing" element={<DevTesting />} />
];

export default DevRoutes;
