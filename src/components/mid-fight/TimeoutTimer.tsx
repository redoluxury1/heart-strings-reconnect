
import React from 'react';
import TimeOutGraphic from './TimeOutGraphic';
import TimerPresets, { TimerPreset } from './timeout/TimerPresets';
import CustomTimerControls from './timeout/CustomTimerControls';
import ActiveTimer from './timeout/ActiveTimer';
import { useTimeoutTimer } from './timeout/useTimeoutTimer';

// Preset timer options in minutes with descriptions
const timeoutPresets: TimerPreset[] = [
  { label: '15 min', value: 15, description: 'Quick breath' },
  { label: '30 min', value: 30, description: 'Cool-down' },
  { label: '1 hour', value: 60, description: 'Brief space' },
];

interface TimeoutTimerProps {
  animationsEnabled?: boolean;
}

const TimeoutTimer: React.FC<TimeoutTimerProps> = ({ animationsEnabled = true }) => {
  const {
    timerActive,
    setTimerActive,
    customMinutes,
    setCustomMinutes,
    customTimeUnit,
    setCustomTimeUnit,
    sliderConfig,
    formatTime,
    startTimer,
    handleCustomTimerStart
  } = useTimeoutTimer(animationsEnabled);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/10 mt-6 mb-10">
      <TimeOutGraphic />
      
      {!timerActive ? (
        <>
          <h3 className="font-cormorant text-2xl text-[#5d4357] mb-6 text-center">
            Set your own time
          </h3>
          
          <TimerPresets presets={timeoutPresets} onSelectPreset={startTimer} />
          
          <CustomTimerControls 
            customMinutes={customMinutes}
            customTimeUnit={customTimeUnit}
            sliderMin={sliderConfig.min}
            sliderMax={sliderConfig.max}
            onMinutesChange={setCustomMinutes}
            onTimeUnitChange={setCustomTimeUnit}
            onStartTimer={handleCustomTimerStart}
          />
        </>
      ) : (
        <ActiveTimer 
          formattedTime={formatTime()} 
          onCancel={() => setTimerActive(false)} 
        />
      )}
    </div>
  );
};

export default TimeoutTimer;
