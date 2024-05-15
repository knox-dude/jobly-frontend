import { useState } from 'react';

// Define the type for the value stored in local storage
type LocalStorageValue<T> = T | null;

function useLocalStorage<T>(key: string, initialValue: T): [LocalStorageValue<T>, (value: T) => void] {
  // Retrieve the value from local storage or use the initial value
  const [storedValue, setStoredValue] = useState<LocalStorageValue<T>>(() => {
    try {
      const item = localStorage.getItem(key);
      // Parse stored json or if none, return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Define a function to set a new value in local storage
  const setValue = (value: T): void => {
    try {
      // Allow value to be a function to mimic useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Save to local storage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

// disclaimer: got this code from chatGPT :P 