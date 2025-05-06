
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomTimerControls from '../CustomTimerControls';

jest.mock('@/components/ui/slider', () => ({
  Slider: ({ onValueChange }: { onValueChange: (val: number[]) => void }) => (
    <input 
      data-testid="mock-slider" 
      type="range" 
      onChange={(e) => onValueChange([parseInt(e.target.value)])} 
    />
  )
}));

describe('CustomTimerControls Component', () => {
  const mockProps = {
    customMinutes: 15,
    customTimeUnit: 'minutes' as 'minutes' | 'hours',
    sliderMin: 5,
    sliderMax: 59,
    onMinutesChange: jest.fn(),
    onTimeUnitChange: jest.fn(),
    onStartTimer: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct initial values', () => {
    render(<CustomTimerControls {...mockProps} />);
    
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
  });

  it('displays correct time format based on time unit', () => {
    const { rerender } = render(<CustomTimerControls {...mockProps} />);
    expect(screen.getByText('15 min')).toBeInTheDocument();
    
    // Test with hours
    rerender(<CustomTimerControls {...mockProps} customTimeUnit="hours" customMinutes={2} />);
    expect(screen.getByText('2 hours')).toBeInTheDocument();
    
    // Test singular hour
    rerender(<CustomTimerControls {...mockProps} customTimeUnit="hours" customMinutes={1} />);
    expect(screen.getByText('1 hour')).toBeInTheDocument();
  });

  it('calls onTimeUnitChange when time unit is changed', () => {
    render(<CustomTimerControls {...mockProps} />);
    
    fireEvent.click(screen.getByText('Hours'));
    expect(mockProps.onTimeUnitChange).toHaveBeenCalledWith('hours');
  });

  it('calls onStartTimer when the start button is clicked', () => {
    render(<CustomTimerControls {...mockProps} />);
    
    fireEvent.click(screen.getByText('Pause Now & Notify Partner'));
    expect(mockProps.onStartTimer).toHaveBeenCalled();
  });
});
