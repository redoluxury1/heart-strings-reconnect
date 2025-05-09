
import { 
  saveToLocalStorage, 
  loadFromLocalStorage, 
  removeFromLocalStorage 
} from '../../utils/storageUtils';

// Storage keys
const END_TIME_KEY = 'bridge-pause-end-time';
const TIMER_ACTIVE_KEY = 'bridge-timer-active';

/**
 * Save timer end time to localStorage
 */
export const saveTimerEndTime = (endTime: number): void => {
  saveToLocalStorage(END_TIME_KEY, endTime.toString());
};

/**
 * Save timer active state to localStorage
 */
export const saveTimerActiveState = (active: boolean): void => {
  saveToLocalStorage(TIMER_ACTIVE_KEY, active.toString());
};

/**
 * Get stored end time from localStorage
 */
export const getStoredEndTime = (): number | null => {
  const storedValue = loadFromLocalStorage(END_TIME_KEY);
  return storedValue ? parseInt(storedValue, 10) : null;
};

/**
 * Get stored timer active state from localStorage
 */
export const getStoredTimerActive = (): string | null => {
  return loadFromLocalStorage(TIMER_ACTIVE_KEY);
};

/**
 * Remove timer persistence data from localStorage
 */
export const removeTimerPersistence = (): void => {
  removeFromLocalStorage(END_TIME_KEY);
  removeFromLocalStorage(TIMER_ACTIVE_KEY);
};

/**
 * Persist timer state to localStorage
 */
export const persistTimerState = (endTime: number, active: boolean): void => {
  saveTimerEndTime(endTime);
  saveTimerActiveState(active);
};
