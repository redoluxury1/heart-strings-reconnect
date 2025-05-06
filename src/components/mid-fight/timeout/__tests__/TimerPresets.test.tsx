
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimerPresets, { TimerPreset } from '../TimerPresets';

describe('TimerPresets Component', () => {
  const mockPresets: TimerPreset[] = [
    { label: '15 min', value: 15, description: 'Quick breath' },
    { label: '30 min', value: 30, description: 'Cool-down' },
    { label: '1 hour', value: 60, description: 'Brief space' },
  ];
  
  const mockOnSelectPreset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all preset buttons', () => {
    render(<TimerPresets presets={mockPresets} onSelectPreset={mockOnSelectPreset} />);
    
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('1 hour')).toBeInTheDocument();
  });

  it('renders descriptions for each preset', () => {
    render(<TimerPresets presets={mockPresets} onSelectPreset={mockOnSelectPreset} />);
    
    expect(screen.getByText('Quick breath')).toBeInTheDocument();
    expect(screen.getByText('Cool-down')).toBeInTheDocument();
    expect(screen.getByText('Brief space')).toBeInTheDocument();
  });

  it('calls onSelectPreset with correct value when button is clicked', () => {
    render(<TimerPresets presets={mockPresets} onSelectPreset={mockOnSelectPreset} />);
    
    fireEvent.click(screen.getByText('15 min'));
    expect(mockOnSelectPreset).toHaveBeenCalledWith(15);
    
    fireEvent.click(screen.getByText('30 min'));
    expect(mockOnSelectPreset).toHaveBeenCalledWith(30);
    
    fireEvent.click(screen.getByText('1 hour'));
    expect(mockOnSelectPreset).toHaveBeenCalledWith(60);
  });
});
