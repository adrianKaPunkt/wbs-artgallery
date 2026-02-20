import { createContext } from "react";

export type StorageMap = Record<string, string>;

export type StorageContextValue = {
  storage: StorageMap;
  length: number;

  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;

  getJSON: <T>(key: string, fallback: T) => T;
  setJSON: (key: string, value: unknown) => void;

  sync: () => void;
};

export const StorageContext = createContext<StorageContextValue | null>(null);
