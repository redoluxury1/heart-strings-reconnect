
import { Route } from "react-router-dom";
import BridgeTheGapCategories from "@/pages/BridgeTheGapCategories";
import BridgeTheGapCategoryDetails from "@/pages/BridgeTheGapCategoryDetails";
import ParentingSubcategories from "@/pages/ParentingSubcategories";
import IntimacySubcategories from "@/pages/IntimacySubcategories";
import HouseholdSubcategories from "@/pages/HouseholdSubcategories";
import MoneySubcategories from "@/pages/MoneySubcategories";
import FeelingDismissedSubcategories from "@/pages/FeelingDismissedSubcategories";
import InLawsSubcategories from "@/pages/InLawsSubcategories";
import FeelingUnseenSubcategories from "@/pages/FeelingUnseenSubcategories";
import BoundariesSubcategories from "@/pages/BoundariesSubcategories";
import CommunicationSubcategories from "@/pages/CommunicationSubcategories";
import HouseholdSubcategoryDetails from "@/pages/HouseholdSubcategoryDetails";
import MoneySubcategoryDetails from "@/pages/MoneySubcategoryDetails";
import FeelingDismissedSubcategoryDetails from "@/pages/FeelingDismissedSubcategoryDetails";
import InLawsSubcategoryDetails from "@/pages/InLawsSubcategoryDetails";
import ParentingSubcategoryDetails from "@/pages/ParentingSubcategoryDetails";
import IntimacySubcategoryDetails from "@/pages/IntimacySubcategoryDetails";
import FeelingUnseenSubcategoryDetails from "@/pages/FeelingUnseenSubcategoryDetails";
import BoundariesSubcategoryDetails from "@/pages/BoundariesSubcategoryDetails";
import CommunicationSubcategoryDetails from "@/pages/CommunicationSubcategoryDetails";

// This function returns an array of Route elements
const BridgeTheGapRoutes = () => [
  <Route key="bridge-categories" path="/bridge-the-gap" element={<BridgeTheGapCategories />} />,
  <Route key="bridge-categories-main" path="/bridge-the-gap/categories" element={<BridgeTheGapCategories />} />,
  <Route key="bridge-details" path="/bridge-the-gap/categories/:categoryId" element={<BridgeTheGapCategoryDetails />} />,
  
  // Subcategory pages
  <Route key="parenting-subcategories" path="/parenting-subcategories" element={<ParentingSubcategories />} />,
  <Route key="intimacy-subcategories" path="/intimacy-subcategories" element={<IntimacySubcategories />} />,
  <Route key="household-subcategories" path="/household-subcategories" element={<HouseholdSubcategories />} />,
  <Route key="money-subcategories" path="/money-subcategories" element={<MoneySubcategories />} />,
  <Route key="feeling-dismissed-subcategories" path="/feeling-dismissed-subcategories" element={<FeelingDismissedSubcategories />} />,
  <Route key="in-laws-subcategories" path="/in-laws-subcategories" element={<InLawsSubcategories />} />,
  <Route key="feeling-unseen-subcategories" path="/feeling-unseen-subcategories" element={<FeelingUnseenSubcategories />} />,
  <Route key="boundaries-subcategories" path="/boundaries-subcategories" element={<BoundariesSubcategories />} />,
  <Route key="communication-subcategories" path="/communication-subcategories" element={<CommunicationSubcategories />} />,
  
  // All subcategory detail pages
  <Route key="household-subcategory-details" path="/bridge-the-gap/categories/household-duties/:subcategoryId" element={<HouseholdSubcategoryDetails />} />,
  <Route key="money-subcategory-details" path="/bridge-the-gap/categories/money/:subcategoryId" element={<MoneySubcategoryDetails />} />,
  <Route key="feeling-dismissed-subcategory-details" path="/bridge-the-gap/categories/feeling-dismissed/:subcategoryId" element={<FeelingDismissedSubcategoryDetails />} />,
  <Route key="in-laws-subcategory-details" path="/bridge-the-gap/categories/in-laws/:subcategoryId" element={<InLawsSubcategoryDetails />} />,
  <Route key="parenting-subcategory-details" path="/bridge-the-gap/categories/parenting/:subcategoryId" element={<ParentingSubcategoryDetails />} />,
  <Route key="intimacy-subcategory-details" path="/bridge-the-gap/categories/intimacy/:subcategoryId" element={<IntimacySubcategoryDetails />} />,
  <Route key="feeling-unseen-subcategory-details" path="/bridge-the-gap/categories/feeling-unseen/:subcategoryId" element={<FeelingUnseenSubcategoryDetails />} />,
  <Route key="boundaries-subcategory-details" path="/bridge-the-gap/categories/boundaries/:subcategoryId" element={<BoundariesSubcategoryDetails />} />,
  <Route key="communication-subcategory-details" path="/bridge-the-gap/categories/communication/:subcategoryId" element={<CommunicationSubcategoryDetails />} />
];

export default BridgeTheGapRoutes;
