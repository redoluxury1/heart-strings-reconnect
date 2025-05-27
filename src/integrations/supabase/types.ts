export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      beta_feedback: {
        Row: {
          content: string
          created_at: string
          feedback_type: string
          id: string
          page_url: string | null
          rating: number | null
          title: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          feedback_type: string
          id?: string
          page_url?: string | null
          rating?: number | null
          title?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          feedback_type?: string
          id?: string
          page_url?: string | null
          rating?: number | null
          title?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          created_at: string
          id: string
          message_text: string
          message_type: string
          metadata: Json | null
          read_at: string | null
          sender_id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_text: string
          message_type?: string
          metadata?: Json | null
          read_at?: string | null
          sender_id: string
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_text?: string
          message_type?: string
          metadata?: Json | null
          read_at?: string | null
          sender_id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "conversation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_sessions: {
        Row: {
          created_at: string | null
          id: string
          initiator_id: string
          metadata: Json | null
          relationship_id: string
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          initiator_id: string
          metadata?: Json | null
          relationship_id: string
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          initiator_id?: string
          metadata?: Json | null
          relationship_id?: string
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_sessions_initiator_id_fkey"
            columns: ["initiator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_sessions_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      couples: {
        Row: {
          date_joined: string | null
          id: string
          shared_progress: Json | null
          user1_id: string
          user2_id: string
        }
        Insert: {
          date_joined?: string | null
          id?: string
          shared_progress?: Json | null
          user1_id: string
          user2_id: string
        }
        Update: {
          date_joined?: string | null
          id?: string
          shared_progress?: Json | null
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      device_tokens: {
        Row: {
          created_at: string
          device_name: string | null
          device_type: string
          id: string
          is_active: boolean | null
          token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_name?: string | null
          device_type: string
          id?: string
          is_active?: boolean | null
          token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_name?: string | null
          device_type?: string
          id?: string
          is_active?: boolean | null
          token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feature_usage: {
        Row: {
          action: string
          created_at: string
          feature_name: string
          id: string
          metadata: Json | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          feature_name: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          feature_name?: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string | null
          id: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      love_notes: {
        Row: {
          created_at: string | null
          id: string
          message: string
          prompt: string
          read: boolean | null
          recipient_id: string | null
          sender_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          prompt: string
          read?: boolean | null
          recipient_id?: string | null
          sender_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          prompt?: string
          read?: boolean | null
          recipient_id?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "love_notes_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "love_notes_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      motivations: {
        Row: {
          content: string | null
          created_at: string | null
          date: string
          id: string
          status: string | null
          type: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          date?: string
          id?: string
          status?: string | null
          type: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          date?: string
          id?: string
          status?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_history: {
        Row: {
          created_at: string
          delivered_at: string | null
          delivery_status: string
          id: string
          message: string
          metadata: Json | null
          notification_type: string
          read_at: string | null
          recipient_id: string
          sender_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          delivery_status?: string
          id?: string
          message: string
          metadata?: Json | null
          notification_type: string
          read_at?: string | null
          recipient_id: string
          sender_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          delivery_status?: string
          id?: string
          message?: string
          metadata?: Json | null
          notification_type?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string | null
          title?: string
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          code_word_notifications: boolean | null
          conversation_notifications: boolean | null
          created_at: string
          email_notifications: boolean | null
          id: string
          love_note_notifications: boolean | null
          notification_sound: boolean | null
          push_notifications: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          code_word_notifications?: boolean | null
          conversation_notifications?: boolean | null
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          love_note_notifications?: boolean | null
          notification_sound?: boolean | null
          push_notifications?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          code_word_notifications?: boolean | null
          conversation_notifications?: boolean | null
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          love_note_notifications?: boolean | null
          notification_sound?: boolean | null
          push_notifications?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          couple_id: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          onboarding_complete: boolean | null
          role: string | null
          updated_at: string | null
          usage_mode: string | null
        }
        Insert: {
          couple_id?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          onboarding_complete?: boolean | null
          role?: string | null
          updated_at?: string | null
          usage_mode?: string | null
        }
        Update: {
          couple_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          onboarding_complete?: boolean | null
          role?: string | null
          updated_at?: string | null
          usage_mode?: string | null
        }
        Relationships: []
      }
      reflections: {
        Row: {
          couple_id: string
          created_at: string | null
          id: string
          partner1_response: Json | null
          partner2_response: Json | null
          prompt_type: string
          updated_at: string | null
        }
        Insert: {
          couple_id: string
          created_at?: string | null
          id?: string
          partner1_response?: Json | null
          partner2_response?: Json | null
          prompt_type: string
          updated_at?: string | null
        }
        Update: {
          couple_id?: string
          created_at?: string | null
          id?: string
          partner1_response?: Json | null
          partner2_response?: Json | null
          prompt_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reflections_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "couples"
            referencedColumns: ["id"]
          },
        ]
      }
      relationships: {
        Row: {
          code_word: Json | null
          created_at: string | null
          id: string
          invite_email: string | null
          invite_name: string | null
          invite_token: string
          partner_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          code_word?: Json | null
          created_at?: string | null
          id?: string
          invite_email?: string | null
          invite_name?: string | null
          invite_token: string
          partner_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          code_word?: Json | null
          created_at?: string | null
          id?: string
          invite_email?: string | null
          invite_name?: string | null
          invite_token?: string
          partner_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "relationships_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relationships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_notes: {
        Row: {
          author_id: string
          couple_id: string
          created_at: string | null
          id: string
          message: string
          type: string
        }
        Insert: {
          author_id: string
          couple_id: string
          created_at?: string | null
          id?: string
          message: string
          type?: string
        }
        Update: {
          author_id?: string
          couple_id?: string
          created_at?: string | null
          id?: string
          message?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_notes_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "couples"
            referencedColumns: ["id"]
          },
        ]
      }
      user_meta: {
        Row: {
          communication_style: string | null
          default_tone: string | null
          love_code: string | null
          most_common_trigger: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          communication_style?: string | null
          default_tone?: string | null
          love_code?: string | null
          most_common_trigger?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          communication_style?: string | null
          default_tone?: string | null
          love_code?: string | null
          most_common_trigger?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      white_flag_logs: {
        Row: {
          created_at: string
          id: string
          message: string
          relationship_id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          relationship_id: string
          timestamp?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          relationship_id?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "white_flag_logs_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
