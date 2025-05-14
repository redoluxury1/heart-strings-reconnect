
/**
 * Format time for display (MM:SS or HH:MM:SS for longer times)
 */
export const formatTimeDisplay = (timeRemaining: number | null): string => {
  if (!timeRemaining) return '00:00';
  
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
