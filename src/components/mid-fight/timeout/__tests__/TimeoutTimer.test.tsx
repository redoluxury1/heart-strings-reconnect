
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeoutTimer from '../../TimeoutTimer';

// Mock the sub-components to isolate TimeoutTimer testing
jest.mock('../TimerPresets', () => ({
  __esModule: true,
  default: ({ onSelectPreset }: { onSelectPreset: (value: number) => void }) => (
    <div data-testid="timer-presets">
      <button onClick={() => onSelectPreset(15)}>15 min</button>
      <button onClick={() => onSelectPreset(30)}>30 min</button>
      <button onClick={() => onSelectPreset(60)}>1 hour</button>
    </div>
  )
}));

jest.mock('../CustomTimerControls', () => ({
  __esModule: true,
  default: ({ onStartTimer }: { onStartTimer: () => void }) => (
    <div data-testid="custom-timer-controls">
      <button onClick={onStartTimer}>Start Custom Timer</button>
    </div>
  )
}));

jest.mock('../ActiveTimer', () => ({
  __esModule: true,
  default: ({ onCancel }: { onCancel: () => void }) => (
    <div data-testid="active-timer">
      <button onClick={onCancel}>Cancel Timer</button>
    </div>
  )
}));

jest.mock('../../TimeOutGraphic', () => ({
  __esModule: true,
  default: () => <div data-testid="timeout-graphic">Time Out Graphic</div>,
}));

// Mock the hook
jest.mock('../useTimeoutTimer', () => ({
  useTimeoutTimer: () => ({
    timerActive: false,
    setTimerActive: jest.fn(),
    customMinutes: 15,
    setCustomMinutes: jest.fn(),
    customTimeUnit: 'minutes',
    setCustomTimeUnit: jest.fn(),
    sliderConfig: { min: 5, max: 59 },
    formatTime: () => '15:00',
    startTimer: jest.fn(),
    handleCustomTimerStart: jest.fn(),
  })
}));

describe('TimeoutTimer Component', () => {
  it('renders TimeOutGraphic component', () => {
    render(<TimeoutTimer />);
    expect(screen.getByTestId('timeout-graphic')).toBeInTheDocument();
  });

  it('renders TimerPresets component when timer is not active', () => {
    render(<TimeoutTimer />);
    expect(screen.getByTestId('timer-presets')).toBeInTheDocument();
  });

  it('renders CustomTimerControls component when timer is not active', () => {
    render(<TimeoutTimer />);
    expect(screen.getByTestId('custom-timer-controls')).toBeInTheDocument();
  });

  // We need to override the mock for this test to check the active state
  it('renders ActiveTimer component when timer is active', () => {
    // Override the useTimeoutTimer mock for this test
    const useTimeoutTimerMock = require('../useTimeoutTimer');
    useTimeoutTimerMock.useTimeoutTimer = jest.fn().mockReturnValue({
      timerActive: true,
      setTimerActive: jest.fn(),
      formatTime: () => '15:00',
    });
    
    render(<TimeoutTimer />);
    expect(screen.getByTestId('active-timer')).toBeInTheDocument();
  });
});
