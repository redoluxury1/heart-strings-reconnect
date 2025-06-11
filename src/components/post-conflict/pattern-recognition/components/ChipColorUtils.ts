
export const getChipColor = (index: number, isSelected: boolean) => {
  if (isSelected) {
    return "bg-[#2e2a63] text-white border-[#2e2a63]";
  }
  
  const colors = [
    "bg-[#F5E6E8] text-[#2e2a63] border-[#E8D5C4] hover:border-[#D3876A]/30",
    "bg-[#FDF0E9] text-[#2e2a63] border-[#F0E5D6] hover:border-[#D3876A]/30",
    "bg-[#F9F5EF] text-[#2e2a63] border-[#E7D9C9] hover:border-[#D3876A]/30",
  ];
  
  return colors[index % colors.length];
};

export const getSubheadText = (prompt: string) => {
  if (prompt.includes("triggers")) {
    return "Let's get curious about what sets things off—it's not about blame, it's about understanding.";
  } else if (prompt.includes("go-to move")) {
    return "No judgment here—we all have ways we try to protect ourselves when things get tough.";
  } else if (prompt.includes("partner usually")) {
    return "Think about their typical response—remember, they're probably protecting themselves too.";
  }
  return "Take your time and choose what feels most true to your experience.";
};
