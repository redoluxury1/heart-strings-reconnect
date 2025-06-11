
// Color schemes and positioning for post-conflict bubbles
export interface BubbleStyle {
  bgColor: string;
  textColor: string;
  position: string;
}

export interface BubbleVariant {
  position: string;
  tail: string;
}

export interface BubbleData {
  id: number;
  message: string;
  style: BubbleStyle;
  positionStyle: string;
  tailPosition: string;
  variantIndex: number;
}

// Color schemes for bubbles with palette colors
export const getBubbleStyles = (): BubbleStyle[] => [
  { bgColor: "bg-[#2e4059]", textColor: "text-white", position: "after:border-t-[#2e4059]" }, // Navy
  { bgColor: "bg-[#8a6f8e]", textColor: "text-white", position: "after:border-t-[#8a6f8e]" }, // Mauve
  { bgColor: "bg-[#c97c5d]", textColor: "text-white", position: "after:border-t-[#c97c5d]" }, // Terracotta
  { bgColor: "bg-[#dbd0e0]", textColor: "text-[#2e4059]", position: "after:border-t-[#dbd0e0]" }, // Light Mauve
  { bgColor: "bg-[#e6c7bc]", textColor: "text-[#2e4059]", position: "after:border-t-[#e6c7bc]" }, // Light Terracotta
];

// Text bubble positions and tails (for variety, coming from different corners)
export const bubbleVariants: BubbleVariant[] = [
  { position: "left-[5%] top-[5%] -rotate-2 max-w-[200px]", tail: "after:left-4" }, // Top left
  { position: "right-[5%] top-[5%] rotate-2 max-w-[210px]", tail: "after:right-4" }, // Top right
  { position: "left-[10%] top-[50%] -rotate-1 max-w-[190px]", tail: "after:left-6" }, // Middle left
  { position: "right-[10%] top-[50%] rotate-1 max-w-[220px]", tail: "after:right-6" }, // Middle right
  { position: "left-[25%] top-[20%] rotate-3 max-w-[180px]", tail: "after:left-10" }, // Upper middle left
  { position: "right-[25%] top-[20%] -rotate-3 max-w-[230px]", tail: "after:right-10" }, // Upper middle right
];
