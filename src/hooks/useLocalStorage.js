import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Load data from localStorage
  const getStoredValue = () => {
    // 1. Safety Check for non-browser environments
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  // Save data to localStorage
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, value]);
  return [value, setValue];
};
