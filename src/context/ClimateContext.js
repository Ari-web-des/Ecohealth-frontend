import { createContext, useContext } from "react";
import useClimate from "../hooks/useClimate";

const ClimateContext = createContext();

export function ClimateProvider({ children }) {
  const climateData = useClimate(); // ONLY ONE CALL HERE
  return (
    <ClimateContext.Provider value={climateData}>
      {children}
    </ClimateContext.Provider>
  );
}

export function useClimateContext() {
  return useContext(ClimateContext);
}