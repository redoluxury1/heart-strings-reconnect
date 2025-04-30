
import { Scenario } from "../../types/games";
import { relationshipScenarios } from "./relationship-scenarios";
import { familyScenarios } from "./family-scenarios";
import { friendshipScenarios } from "./friendship-scenarios";
import { financialScenarios } from "./financial-scenarios";

// Combine all scenario types into a single array
const dramaDetoxScenarios: Scenario[] = [
  ...relationshipScenarios,
  ...familyScenarios,
  ...friendshipScenarios,
  ...financialScenarios
];

export default dramaDetoxScenarios;
