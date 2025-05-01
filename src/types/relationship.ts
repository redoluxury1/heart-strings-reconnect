
export interface Relationship {
  id: string;
  userId: string;
  partnerId: string | null;
  inviteToken: string;
  inviteEmail: string | null;
  inviteName: string | null;
  status: 'invited' | 'connected' | null;
  createdAt: Date;
  updatedAt: Date;
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
