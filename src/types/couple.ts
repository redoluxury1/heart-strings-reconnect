
export interface Couple {
  id: string;
  user1_id: string;
  user2_id: string;
  date_joined: Date;
  shared_progress?: Record<string, any> | null;
}

export interface Reflection {
  id: string;
  couple_id: string;
  prompt_type: string;
  partner1_response?: Record<string, any> | null;
  partner2_response?: Record<string, any> | null;
  created_at: Date;
  updated_at: Date;
}

export interface Motivation {
  id: string;
  user_id: string;
  date: Date;
  type: string;
  status: 'unseen' | 'seen' | 'completed';
  content?: string | null;
  created_at: Date;
}

export interface SharedNote {
  id: string;
  couple_id: string;
  author_id: string;
  message: string;
  type: string;
  created_at: Date;
}

export interface UserMeta {
  user_id: string;
  communication_style?: string | null;
  most_common_trigger?: string | null;
  default_tone?: string | null;
  updated_at: Date;
}
