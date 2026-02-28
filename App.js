import { ClimateProvider } from "./src/context/ClimateContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <ClimateProvider>
      <AppNavigator />
    </ClimateProvider>
  );
}