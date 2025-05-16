
import { Route } from "react-router-dom";
import BridgeTheGapCategories from "@/pages/BridgeTheGapCategories";
import BridgeTheGapCategoryDetails from "@/pages/BridgeTheGapCategoryDetails";

// This function returns an array of Route elements
const BridgeTheGapRoutes = () => [
  <Route key="bridge-categories" path="/bridge-the-gap" element={<BridgeTheGapCategories />} />,
  <Route key="bridge-details" path="/bridge-the-gap/:category" element={<BridgeTheGapCategoryDetails />} />
];

export default BridgeTheGapRoutes;
