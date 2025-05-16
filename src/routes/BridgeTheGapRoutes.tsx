
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import BridgeTheGapCategories from "@/pages/BridgeTheGapCategories";
import BridgeTheGapCategoryDetails from "@/pages/BridgeTheGapCategoryDetails";
import ParentingSubcategories from "@/pages/ParentingSubcategories";
import ParentingSubcategoryDetails from "@/pages/ParentingSubcategoryDetails";
import IntimacySubcategories from "@/pages/IntimacySubcategories";
import IntimacySubcategoryDetails from "@/pages/IntimacySubcategoryDetails";
import HouseholdSubcategories from "@/pages/HouseholdSubcategories";
import HouseholdSubcategoryDetails from "@/pages/HouseholdSubcategoryDetails";
import MoneySubcategories from "@/pages/MoneySubcategories";
import MoneySubcategoryDetails from "@/pages/MoneySubcategoryDetails";
import FeelingDismissedSubcategories from "@/pages/FeelingDismissedSubcategories";
import FeelingDismissedSubcategoryDetails from "@/pages/FeelingDismissedSubcategoryDetails";
import InLawsSubcategories from "@/pages/InLawsSubcategories";
import InLawsSubcategoryDetails from "@/pages/InLawsSubcategoryDetails";
import FeelingUnseenSubcategories from "@/pages/FeelingUnseenSubcategories";
import FeelingUnseenSubcategoryDetails from "@/pages/FeelingUnseenSubcategoryDetails";
import CommunicationSubcategories from "@/pages/CommunicationSubcategories";
import CommunicationSubcategoryDetails from "@/pages/CommunicationSubcategoryDetails";
import BoundariesSubcategories from "@/pages/BoundariesSubcategories";
import BoundariesSubcategoryDetails from "@/pages/BoundariesSubcategoryDetails";

const BridgeTheGapRoutes = () => (
  <>
    <Route path="/bridge-the-gap/categories" element={
      <ProtectedRoute>
        <BridgeTheGapCategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/:categoryId" element={
      <ProtectedRoute>
        <BridgeTheGapCategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/parenting" element={
      <ProtectedRoute>
        <ParentingSubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/parenting/:subcategoryId" element={
      <ProtectedRoute>
        <ParentingSubcategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/intimacy" element={
      <ProtectedRoute>
        <IntimacySubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/intimacy/:subcategoryId" element={
      <ProtectedRoute>
        <IntimacySubcategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/household-duties" element={
      <ProtectedRoute>
        <HouseholdSubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/household-duties/:subcategoryId" element={
      <ProtectedRoute>
        <HouseholdSubcategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/money" element={
      <ProtectedRoute>
        <MoneySubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/money/:subcategoryId" element={
      <ProtectedRoute>
        <MoneySubcategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/feeling-dismissed" element={
      <ProtectedRoute>
        <FeelingDismissedSubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/feeling-dismissed/:subcategoryId" element={
      <ProtectedRoute>
        <FeelingDismissedSubcategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/in-laws" element={
      <ProtectedRoute>
        <InLawsSubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/in-laws/:subcategoryId" element={
      <ProtectedRoute>
        <InLawsSubcategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/feeling-unseen" element={
      <ProtectedRoute>
        <FeelingUnseenSubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/feeling-unseen/:subcategoryId" element={
      <ProtectedRoute>
        <FeelingUnseenSubcategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/communication" element={
      <ProtectedRoute>
        <CommunicationSubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/communication/:subcategoryId" element={
      <ProtectedRoute>
        <CommunicationSubcategoryDetails />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/boundaries" element={
      <ProtectedRoute>
        <BoundariesSubcategories />
      </ProtectedRoute>
    } />
    <Route path="/bridge-the-gap/categories/boundaries/:subcategoryId" element={
      <ProtectedRoute>
        <BoundariesSubcategoryDetails />
      </ProtectedRoute>
    } />
  </>
);

export default BridgeTheGapRoutes;
