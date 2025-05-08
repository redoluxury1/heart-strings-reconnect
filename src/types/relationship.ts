
export interface Relationship {
  id: string;
  userId: string;
  partnerId: string | null;
  inviteToken: string;
  inviteEmail: string | null;
  inviteName: string | null;
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
  partnerId: string | null;
  relationshipId: string | null;
  loveCode: string | null;
  secondaryLoveCode: string | null;
}
