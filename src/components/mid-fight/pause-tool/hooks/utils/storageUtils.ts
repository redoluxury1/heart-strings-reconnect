
/**
 * Utility functions for localStorage operations
 */

/**
 * Save a value to localStorage with the given key
 */
export const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

/**
 * Load a value from localStorage with the given key
 */
export const loadFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

/**
 * Remove a value from localStorage with the given key
 */
export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
