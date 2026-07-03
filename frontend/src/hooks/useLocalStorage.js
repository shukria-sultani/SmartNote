import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Load notes from local storage
  const getStoredValue = () => {
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
// Save notes to local storage
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      // Saves the entire updated 'value' (the array) to localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, value]);
  
 // Remove the notes by id
  const removeNoteById = (idToRemove) => {
    // Ensure 'value' is an array before trying to filter it
    if (!Array.isArray(value)) {
        console.warn('useLocalStorage value is not an array, cannot remove by ID.');
        return;
    }
    
    // Use the functional update form for safe state transitions
    setValue(prevList => {
        // Filter the list to exclude the item whose ID matches idToRemove
        const newList = prevList.filter(item => item.id !== idToRemove);
        return newList;
    });
  };

  return { 
    value, 
    setValue, 
    removeNoteById 
  };
};