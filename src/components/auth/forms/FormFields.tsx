
import React from 'react';
import { Input } from "@/components/ui/input";

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({ value, onChange, id = "email" }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#1E2A38]">
        Email
      </label>
      <Input
        id={id}
        type="email"
        placeholder="your@email.com"
        value={value}
        onChange={onChange}
        className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 placeholder-gray-400 text-[#1E2A38]"
        required
      />
    </div>
  );
};

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, id = "password" }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#1E2A38]">
        Password
      </label>
      <Input
        id={id}
        type="password"
        value={value}
        onChange={onChange}
        className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 text-[#1E2A38]"
        required
      />
    </div>
  );
};

interface NameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameField: React.FC<NameFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="name" className="block text-sm font-medium text-[#1E2A38]">
        Full Name
      </label>
      <Input
        id="name"
        type="text"
        placeholder="Your Name"
        value={value}
        onChange={onChange}
        className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 placeholder-gray-400 text-[#1E2A38]"
        required
      />
    </div>
  );
};
