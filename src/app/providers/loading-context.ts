import { createContext, useContext } from "react";

export type LoadingContextValue = {
  progress: number;
  reportProgress: (value: number) => void;
  complete: () => void;
  isReady: boolean;
};

export const LoadingContext = createContext<LoadingContextValue | undefined>(
  undefined
);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};
