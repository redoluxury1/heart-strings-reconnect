
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameInputProps {
  partnerName: string;
  setPartnerName: (value: string) => void;
  disabled?: boolean;
}

const NameInput: React.FC<NameInputProps> = ({
  partnerName,
  setPartnerName,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="partnerName" className="text-midnight-indigo font-medium">
        Partner's Name (Optional)
      </Label>
      <Input
        id="partnerName"
        type="text"
        placeholder="Their name"
        value={partnerName}
        onChange={(e) => setPartnerName(e.target.value)}
        className="border-2 border-[#6A4A74]/30 focus:border-[#6A4A74] focus:ring-[#6A4A74]/20"
        disabled={disabled}
      />
    </div>
  );
};

export default NameInput;
