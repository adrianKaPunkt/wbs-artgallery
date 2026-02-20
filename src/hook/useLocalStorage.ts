import { useState, useEffect } from "react";

export function useLocalStorage(key: string, initialValue: string) {
  // Get from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  // Persist to localStorage and dispatch storage event
  const setValue = (value: string | ((prevValue: string) => string)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Trigger storage event for same-tab updates (storage event only fires cross-tab)
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };
  // Listen for storage changes (other tabs + manual events)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error("Error parsing localStorage:", error);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);
  return [storedValue, setValue];
}
