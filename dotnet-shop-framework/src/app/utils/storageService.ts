export const setLocalStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
}

export const clearLocalStorageItems = (): void => {
  localStorage.clear();
}
