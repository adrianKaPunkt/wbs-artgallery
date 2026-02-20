import type { StorageMap } from "./context";

export function snapshotLocalStorage(): StorageMap {
  const snap: StorageMap = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    const value = localStorage.getItem(key);
    if (value !== null) snap[key] = value;
  }
  return snap;
}
