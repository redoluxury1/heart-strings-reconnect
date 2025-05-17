
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
  partnerEmail: string;
  setPartnerEmail: (value: string) => void;
  disabled?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
  partnerEmail,
  setPartnerEmail,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="partnerEmail" className="text-midnight-indigo font-medium">
        Partner's Email
      </Label>
      <Input
        id="partnerEmail"
        type="email"
        placeholder="partner@example.com"
        value={partnerEmail}
        onChange={(e) => setPartnerEmail(e.target.value)}
        className="border-2 border-[#6A4A74]/30 focus:border-[#6A4A74] focus:ring-[#6A4A74]/20"
        disabled={disabled}
      />
    </div>
  );
};

export default EmailInput;
