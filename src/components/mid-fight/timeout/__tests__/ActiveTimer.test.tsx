
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActiveTimer from '../ActiveTimer';

describe('ActiveTimer Component', () => {
  const mockFormattedTime = '15:00';
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the timer with formatted time', () => {
    render(<ActiveTimer formattedTime={mockFormattedTime} onCancel={mockOnCancel} />);
    
    expect(screen.getByText(mockFormattedTime)).toBeInTheDocument();
    expect(screen.getByText('Your partner has been notified that you need some time.')).toBeInTheDocument();
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(<ActiveTimer formattedTime={mockFormattedTime} onCancel={mockOnCancel} />);
    
    fireEvent.click(screen.getByText('Cancel Timer'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('displays the motivational message', () => {
    render(<ActiveTimer formattedTime={mockFormattedTime} onCancel={mockOnCancel} />);
    
    expect(screen.getByText("You're doing something brave. Give yourself this time.")).toBeInTheDocument();
  });
});
