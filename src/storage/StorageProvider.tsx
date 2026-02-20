"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  StorageContext,
  type StorageContextValue,
  type StorageMap,
} from "./context";
import { snapshotLocalStorage } from "./utils";

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [storage, setStorage] = useState<StorageMap>(() =>
    snapshotLocalStorage(),
  );
  const [length, setLength] = useState<number>(() => localStorage.length);

  const sync = () => {
    setStorage(snapshotLocalStorage());
    setLength(localStorage.length);
  };

  useEffect(() => {
    const onStorage = () => sync(); // andere Tabs
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<StorageContextValue>(() => {
    const getItem = (key: string) => localStorage.getItem(key);

    const setItem = (key: string, value: string) => {
      localStorage.setItem(key, value);
      sync();
    };

    const removeItem = (key: string) => {
      localStorage.removeItem(key);
      sync();
    };

    const clear = () => {
      localStorage.clear();
      sync();
    };

    const getJSON = <T,>(key: string, fallback: T): T => {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return fallback;
      }
    };

    const setJSON = (key: string, value: unknown) => {
      localStorage.setItem(key, JSON.stringify(value));
      sync();
    };

    return {
      storage,
      length,
      getItem,
      setItem,
      removeItem,
      clear,
      getJSON,
      setJSON,
      sync,
    };
  }, [storage, length]);

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
