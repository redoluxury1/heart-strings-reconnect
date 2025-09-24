
export interface Relationship {
  id: string;
  user_id: string;
  partner_id: string | null;
  invite_token: string;
  invite_email: string | null;
  invite_name: string | null;
  status: 'invited' | 'connected' | null;
  codeWord?: CodeWordInfo | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeWordInfo {
  word: string;
  updatedAt: Date;
  updatedBy: string;
  status: 'pending' | 'confirmed' | 'negotiation';
  partnerSuggestion?: string;
  userSuggestion?: string;
  lastUsed?: Date;
}

export interface InviteRequest {
  partnerEmail: string;
  partnerName?: string;
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  role: 'individual' | 'partner';
  usage_mode: 'solo' | 'couple';
  couple_id: string | null;
  partnerId: string | null;
  relationshipId: string | null;
}
