
import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface InviteButtonProps {
  isSending: boolean;
  onClick: () => void;
}

const InviteButton: React.FC<InviteButtonProps> = ({
  isSending,
  onClick
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isSending}
      className="w-full mt-4 rounded-full bg-[#6A4A74] hover:bg-[#6A4A74]/90 text-white font-medium"
    >
      {isSending ? (
        <>Sending...</>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Invitation
        </>
      )}
    </Button>
  );
};

export default InviteButton;
