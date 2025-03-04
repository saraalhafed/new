export const getStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error accessing sessionStorage:", error);
      return null;
    }
  }
  return null;
};

export const setStorageItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting sessionStorage:", error);
    }
  }
};

export const removeStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing sessionStorage item:", error);
    }
  }
};
