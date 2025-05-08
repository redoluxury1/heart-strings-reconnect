
import React from 'react';

const ReminderToggle: React.FC = () => {
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="inline-flex items-center gap-2 p-3 bg-[#f7e0dc]/30 rounded-lg">
        <input type="checkbox" id="remind" className="rounded" />
        <label htmlFor="remind" className="text-sm text-[#5d4357]">
          Remind us about our code word during a fight
        </label>
      </div>
    </div>
  );
};

export default ReminderToggle;
