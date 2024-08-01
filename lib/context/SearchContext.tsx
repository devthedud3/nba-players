"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SearchContextProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<string>("");
  const searchContextValues: SearchContextProps = {
    search: value,
    setSearch: setValue,
  };
  return (
    <SearchContext.Provider value={searchContextValues}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
