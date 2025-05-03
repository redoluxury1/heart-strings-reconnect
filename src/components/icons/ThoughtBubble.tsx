
import React from "react";

// Create a custom ThoughtBubble icon component since it's not in lucide-react
const ThoughtBubble = ({ className = "", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 4a2 2 0 0 0-2.2-2 2 2 0 0 0-1.8.9c-.5.7-1.2.6-1.2.6C7.3 2.4 4 6 4 8.5c0 2 1.5 8 4.5 8S12 14 12 14c.9 0 1.6-.6 2-1a6 6 0 0 0 2-3.5V9c1.2 0 2 1 2 1 .5 0 1-1 1-3s-.5-3-1-3Z" />
      <circle cx="5" cy="19" r="1" />
      <circle cx="8" cy="21" r="1" />
      <circle cx="11" cy="18" r="1" />
    </svg>
  );
};

export default ThoughtBubble;
