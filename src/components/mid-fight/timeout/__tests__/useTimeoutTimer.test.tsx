
import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTimeoutTimer } from '../useTimeoutTimer';

// Mock the toast function
jest.mock('@/components/ui/sonner', () => ({
  toast: jest.fn(),
}));

// Mock navigator.vibrate
global.navigator.vibrate = jest.fn();

// Mock Audio API
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();

describe('useTimeoutTimer Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useTimeoutTimer());
    
    expect(result.current.timerActive).toBe(false);
    expect(result.current.customMinutes).toBe(15);
    expect(result.current.customTimeUnit).toBe('minutes');
    expect(result.current.sliderConfig).toEqual({
      min: 5,
      max: 59,
      defaultValue: 15,
    });
  });

  it('starts timer with correct minutes', () => {
    const { result } = renderHook(() => useTimeoutTimer());
    
    act(() => {
      result.current.startTimer(30);
    });
    
    expect(result.current.timerActive).toBe(true);
    // Check that the formatted time represents 30:00 (30 minutes)
    expect(result.current.formatTime()).toBe('30:00');
  });

  it('formats time correctly for minutes and hours', () => {
    const { result } = renderHook(() => useTimeoutTimer());
    
    // Test minutes format (less than 60 minutes)
    act(() => {
      result.current.startTimer(45);
    });
    expect(result.current.formatTime()).toBe('45:00');
    
    // Test hours format (60 minutes or more)
    act(() => {
      result.current.startTimer(90);
    });
    expect(result.current.formatTime()).toBe('1:30');
  });

  it('counts down seconds correctly', () => {
    const { result } = renderHook(() => useTimeoutTimer());
    
    act(() => {
      result.current.startTimer(1); // 1 minute = 60 seconds
    });
    
    // Advance timer by 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    // Should show 00:50 (50 seconds left from 1 minute)
    expect(result.current.formatTime()).toBe('00:50');
  });

  it('handles custom timer with minutes and hours', () => {
    const { result } = renderHook(() => useTimeoutTimer());
    
    // Set up for minutes
    act(() => {
      result.current.setCustomTimeUnit('minutes');
      result.current.setCustomMinutes(25);
    });
    
    act(() => {
      result.current.handleCustomTimerStart();
    });
    
    expect(result.current.formatTime()).toBe('25:00');
    
    // Reset and test hours
    act(() => {
      result.current.setTimerActive(false);
      result.current.setCustomTimeUnit('hours');
      result.current.setCustomMinutes(2); // 2 hours
    });
    
    act(() => {
      result.current.handleCustomTimerStart();
    });
    
    // Should format as 2:00 (2 hours, 0 minutes)
    expect(result.current.formatTime()).toBe('2:00');
  });

  it('updates slider config when time unit changes', () => {
    const { result } = renderHook(() => useTimeoutTimer());
    
    // Initial config for minutes
    expect(result.current.sliderConfig).toEqual({
      min: 5,
      max: 59,
      defaultValue: 15,
    });
    
    // Change to hours
    act(() => {
      result.current.setCustomTimeUnit('hours');
    });
    
    // Config should update for hours
    expect(result.current.sliderConfig).toEqual({
      min: 1,
      max: 6,
      defaultValue: 1,
    });
  });
  
  it('plays sound and vibrates when timer completes', () => {
    const { result } = renderHook(() => useTimeoutTimer());
    
    act(() => {
      result.current.startTimer(1/60); // 1 second timer for testing
    });
    
    // Advance timer to completion
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Verify vibration was triggered
    expect(navigator.vibrate).toHaveBeenCalledWith([100, 50, 100, 50, 100]);
    
    // Verify audio play was attempted
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});
