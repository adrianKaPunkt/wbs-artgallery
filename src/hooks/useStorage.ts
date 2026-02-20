import { useContext } from "react";
import { StorageContext, type StorageContextValue } from "../storage/context";

export function useStorage(): StorageContextValue {
  const ctx = useContext(StorageContext);
  if (!ctx)
    throw new Error("useStorage must be used inside <StorageProvider />");
  return ctx;
}
