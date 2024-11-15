import { createContext } from "react";

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  return (
    <FiltersContext.Provider
      value={{
        categoria: "all",
        tipo: "all",
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
