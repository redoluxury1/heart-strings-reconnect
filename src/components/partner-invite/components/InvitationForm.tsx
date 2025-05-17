
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";
import { acceptPartnerInvite } from '@/services/supabase';

interface InvitationFormProps {
  email: string;
  setEmail: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  isLoading: boolean;
  inviterName: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const InvitationForm: React.FC<InvitationFormProps> = ({
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  inviterName,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-midnight-indigo mb-1">
          Your Name
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-lavender-blue/30"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-midnight-indigo mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-lavender-blue/30"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-midnight-indigo mb-1">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border-lavender-blue/30"
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-midnight-indigo mb-1">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border-lavender-blue/30"
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-mauve-rose hover:bg-mauve-rose/90 text-white mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account & Connect"}
      </Button>
      
      <p className="text-xs text-midnight-indigo/60 text-center mt-6">
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
};

export default InvitationForm;
