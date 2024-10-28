export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      m_category: {
        Row: {
          m_c_id: number;
          m_c_name: string;
        };
        Insert: {
          m_c_id?: number;
          m_c_name: string;
        };
        Update: {
          m_c_id?: number;
          m_c_name?: string;
        };
        Relationships: [];
      };
      o_t_c_kakaopay: {
        Row: {
          id: number;
          o_t_c_id: number | null;
          o_t_c_kakaopay_cid: string | null;
          o_t_c_kakaopay_tid: string | null;
          o_t_c_member_id: number | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          o_t_c_id?: number | null;
          o_t_c_kakaopay_cid?: string | null;
          o_t_c_kakaopay_tid?: string | null;
          o_t_c_member_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          o_t_c_id?: number | null;
          o_t_c_kakaopay_cid?: string | null;
          o_t_c_kakaopay_tid?: string | null;
          o_t_c_member_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "o_t_c_kakaopay_o_t_c_id_fkey";
            columns: ["o_t_c_id"];
            isOneToOne: false;
            referencedRelation: "one_time_club";
            referencedColumns: ["one_time_club_id"];
          },
          {
            foreignKeyName: "o_t_c_kakaopay_o_t_c_member_id_fkey";
            columns: ["o_t_c_member_id"];
            isOneToOne: false;
            referencedRelation: "o_t_c_member";
            referencedColumns: ["o_t_c_member_id"];
          },
          {
            foreignKeyName: "o_t_c_kakaopay_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      o_t_c_member: {
        Row: {
          o_t_c_id: number;
          o_t_c_member_id: number;
          user_id: string;
        };
        Insert: {
          o_t_c_id: number;
          o_t_c_member_id?: number;
          user_id: string;
        };
        Update: {
          o_t_c_id?: number;
          o_t_c_member_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "o_t_c_member_o_t_c_id_fkey";
            columns: ["o_t_c_id"];
            isOneToOne: false;
            referencedRelation: "one_time_club";
            referencedColumns: ["one_time_club_id"];
          },
          {
            foreignKeyName: "o_t_c_member_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      one_time_club: {
        Row: {
          m_c_id: number;
          one_time_age: number | null;
          one_time_club_date_time: string;
          one_time_club_id: number;
          one_time_club_introduction: string;
          one_time_club_location: string;
          one_time_club_name: string;
          one_time_create_at: string;
          one_time_gender: string | null;
          one_time_image: string;
          one_time_people_limited: number | null;
          one_time_tax: number;
          s_c_id: number;
          user_id: string;
        };
        Insert: {
          m_c_id: number;
          one_time_age?: number | null;
          one_time_club_date_time?: string;
          one_time_club_id?: number;
          one_time_club_introduction: string;
          one_time_club_location: string;
          one_time_club_name: string;
          one_time_create_at?: string;
          one_time_gender?: string | null;
          one_time_image: string;
          one_time_people_limited?: number | null;
          one_time_tax: number;
          s_c_id: number;
          user_id?: string;
        };
        Update: {
          m_c_id?: number;
          one_time_age?: number | null;
          one_time_club_date_time?: string;
          one_time_club_id?: number;
          one_time_club_introduction?: string;
          one_time_club_location?: string;
          one_time_club_name?: string;
          one_time_create_at?: string;
          one_time_gender?: string | null;
          one_time_image?: string;
          one_time_people_limited?: number | null;
          one_time_tax?: number;
          s_c_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "one_time_club_m_c_id_fkey";
            columns: ["m_c_id"];
            isOneToOne: false;
            referencedRelation: "m_category";
            referencedColumns: ["m_c_id"];
          },
          {
            foreignKeyName: "one_time_club_s_c_id_fkey";
            columns: ["s_c_id"];
            isOneToOne: false;
            referencedRelation: "s_category";
            referencedColumns: ["s_c_id"];
          },
          {
            foreignKeyName: "one_time_club_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      r_c_member: {
        Row: {
          r_c_id: number;
          r_c_member_id: number;
          r_c_participation_request_id: number;
          user_id: string;
        };
        Insert: {
          r_c_id: number;
          r_c_member_id?: number;
          r_c_participation_request_id: number;
          user_id: string;
        };
        Update: {
          r_c_id?: number;
          r_c_member_id?: number;
          r_c_participation_request_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "r_c_member_r_c_id_fkey1";
            columns: ["r_c_id"];
            isOneToOne: false;
            referencedRelation: "regular_club";
            referencedColumns: ["regular_club_id"];
          },
          {
            foreignKeyName: "r_c_member_r_c_participation_request_id_fkey";
            columns: ["r_c_participation_request_id"];
            isOneToOne: false;
            referencedRelation: "r_c_participation_request";
            referencedColumns: ["r_c_participation_request_id"];
          },
          {
            foreignKeyName: "r_c_member_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      r_c_n_chatting: {
        Row: {
          admin: boolean;
          r_c_id: number;
          r_c_member_id: number;
          r_c_n_chatting_id: number;
          r_c_n_chatting_room_id: number;
        };
        Insert: {
          admin?: boolean;
          r_c_id: number;
          r_c_member_id: number;
          r_c_n_chatting_id?: number;
          r_c_n_chatting_room_id: number;
        };
        Update: {
          admin?: boolean;
          r_c_id?: number;
          r_c_member_id?: number;
          r_c_n_chatting_id?: number;
          r_c_n_chatting_room_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "r_c_n_chatting_r_c_id_fkey";
            columns: ["r_c_id"];
            isOneToOne: false;
            referencedRelation: "regular_club";
            referencedColumns: ["regular_club_id"];
          },
          {
            foreignKeyName: "r_c_n_chatting_r_c_member_id_fkey";
            columns: ["r_c_member_id"];
            isOneToOne: false;
            referencedRelation: "r_c_member";
            referencedColumns: ["r_c_member_id"];
          },
          {
            foreignKeyName: "r_c_n_chatting_r_c_n_chatting_room_id_fkey";
            columns: ["r_c_n_chatting_room_id"];
            isOneToOne: false;
            referencedRelation: "r_c_n_chatting_room";
            referencedColumns: ["r_c_n_chatting_room_id"];
          }
        ];
      };
      r_c_n_chatting_message: {
        Row: {
          r_c_id: number;
          r_c_member_id: number;
          r_c_n_chatting_id: number;
          r_c_n_chatting_message_content: string;
          r_c_n_chatting_message_create_at: string;
          r_c_n_chatting_message_id: number;
          r_c_n_chatting_room_id: number;
          user_id: string;
        };
        Insert: {
          r_c_id: number;
          r_c_member_id: number;
          r_c_n_chatting_id: number;
          r_c_n_chatting_message_content: string;
          r_c_n_chatting_message_create_at?: string;
          r_c_n_chatting_message_id?: number;
          r_c_n_chatting_room_id: number;
          user_id?: string;
        };
        Update: {
          r_c_id?: number;
          r_c_member_id?: number;
          r_c_n_chatting_id?: number;
          r_c_n_chatting_message_content?: string;
          r_c_n_chatting_message_create_at?: string;
          r_c_n_chatting_message_id?: number;
          r_c_n_chatting_room_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "r_c_n_chatting_message_r_c_id_fkey";
            columns: ["r_c_id"];
            isOneToOne: false;
            referencedRelation: "regular_club";
            referencedColumns: ["regular_club_id"];
          },
          {
            foreignKeyName: "r_c_n_chatting_message_r_c_member_id_fkey";
            columns: ["r_c_member_id"];
            isOneToOne: false;
            referencedRelation: "r_c_member";
            referencedColumns: ["r_c_member_id"];
          },
          {
            foreignKeyName: "r_c_n_chatting_message_r_c_n_chatting_id_fkey";
            columns: ["r_c_n_chatting_id"];
            isOneToOne: false;
            referencedRelation: "r_c_n_chatting";
            referencedColumns: ["r_c_n_chatting_id"];
          },
          {
            foreignKeyName: "r_c_n_chatting_message_r_c_n_chatting_room_id_fkey";
            columns: ["r_c_n_chatting_room_id"];
            isOneToOne: false;
            referencedRelation: "r_c_n_chatting_room";
            referencedColumns: ["r_c_n_chatting_room_id"];
          },
          {
            foreignKeyName: "r_c_n_chatting_message_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      r_c_n_chatting_room: {
        Row: {
          r_c_n_chatting_room_id: number;
          r_c_n_chatting_room_name: string;
          regular_club_id: number | null;
          user_id: string;
        };
        Insert: {
          r_c_n_chatting_room_id?: number;
          r_c_n_chatting_room_name: string;
          regular_club_id?: number | null;
          user_id: string;
        };
        Update: {
          r_c_n_chatting_room_id?: number;
          r_c_n_chatting_room_name?: string;
          regular_club_id?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "r_c_n_chatting_room_regular_club_id_fkey";
            columns: ["regular_club_id"];
            isOneToOne: true;
            referencedRelation: "regular_club";
            referencedColumns: ["regular_club_id"];
          }
        ];
      };
      r_c_notification: {
        Row: {
          r_c_notification_content: string;
          r_c_notification_create_at: string;
          r_c_notification_date_time: string;
          r_c_notification_id: number;
          r_c_notification_limited: number;
          r_c_notification_location: string;
          r_c_notification_name: string;
          r_c_notification_tax: number;
          user_id: string;
        };
        Insert: {
          r_c_notification_content: string;
          r_c_notification_create_at?: string;
          r_c_notification_date_time: string;
          r_c_notification_id?: number;
          r_c_notification_limited: number;
          r_c_notification_location: string;
          r_c_notification_name: string;
          r_c_notification_tax: number;
          user_id?: string;
        };
        Update: {
          r_c_notification_content?: string;
          r_c_notification_create_at?: string;
          r_c_notification_date_time?: string;
          r_c_notification_id?: number;
          r_c_notification_limited?: number;
          r_c_notification_location?: string;
          r_c_notification_name?: string;
          r_c_notification_tax?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "r_c_notification_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      r_c_notification_kakaopay: {
        Row: {
          r_c_id: number | null;
          r_c_member_id: number | null;
          r_c_notification_id: number | null;
          r_c_notification_kakaopay_cid: string | null;
          r_c_notification_kakaopay_id: number;
          r_c_notification_kakaopay_tid: string | null;
          r_c_participation_request_id: number | null;
          user_id: string | null;
        };
        Insert: {
          r_c_id?: number | null;
          r_c_member_id?: number | null;
          r_c_notification_id?: number | null;
          r_c_notification_kakaopay_cid?: string | null;
          r_c_notification_kakaopay_id?: number;
          r_c_notification_kakaopay_tid?: string | null;
          r_c_participation_request_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          r_c_id?: number | null;
          r_c_member_id?: number | null;
          r_c_notification_id?: number | null;
          r_c_notification_kakaopay_cid?: string | null;
          r_c_notification_kakaopay_id?: number;
          r_c_notification_kakaopay_tid?: string | null;
          r_c_participation_request_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "r_c_notification_kakaopay_r_c_id_fkey";
            columns: ["r_c_id"];
            isOneToOne: false;
            referencedRelation: "regular_club";
            referencedColumns: ["regular_club_id"];
          },
          {
            foreignKeyName: "r_c_notification_kakaopay_r_c_member_id_fkey";
            columns: ["r_c_member_id"];
            isOneToOne: false;
            referencedRelation: "r_c_member";
            referencedColumns: ["r_c_member_id"];
          },
          {
            foreignKeyName: "r_c_notification_kakaopay_r_c_notification_id_fkey";
            columns: ["r_c_notification_id"];
            isOneToOne: false;
            referencedRelation: "r_c_notification";
            referencedColumns: ["r_c_notification_id"];
          },
          {
            foreignKeyName: "r_c_notification_kakaopay_r_c_participation_request_id_fkey";
            columns: ["r_c_participation_request_id"];
            isOneToOne: false;
            referencedRelation: "r_c_participation_request";
            referencedColumns: ["r_c_participation_request_id"];
          },
          {
            foreignKeyName: "r_c_notification_kakaopay_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      r_c_notification_member: {
        Row: {
          r_c_member_id: number;
          r_c_notification_id: number;
          user_id: string;
        };
        Insert: {
          r_c_member_id?: number;
          r_c_notification_id: number;
          user_id?: string;
        };
        Update: {
          r_c_member_id?: number;
          r_c_notification_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "r_c_notification_member_r_c_notification_id_fkey";
            columns: ["r_c_notification_id"];
            isOneToOne: false;
            referencedRelation: "r_c_notification";
            referencedColumns: ["r_c_notification_id"];
          },
          {
            foreignKeyName: "r_c_notification_member_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      r_c_participation_request: {
        Row: {
          r_c_id: number | null;
          r_c_participation_request_approved_date: string | null;
          r_c_participation_request_create_at: string;
          r_c_participation_request_id: number;
          r_c_participation_request_status: string;
          user_id: string | null;
        };
        Insert: {
          r_c_id?: number | null;
          r_c_participation_request_approved_date?: string | null;
          r_c_participation_request_create_at?: string;
          r_c_participation_request_id?: number;
          r_c_participation_request_status?: string;
          user_id?: string | null;
        };
        Update: {
          r_c_id?: number | null;
          r_c_participation_request_approved_date?: string | null;
          r_c_participation_request_create_at?: string;
          r_c_participation_request_id?: number;
          r_c_participation_request_status?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "r_c_participation_request_r_c_id_fkey";
            columns: ["r_c_id"];
            isOneToOne: false;
            referencedRelation: "regular_club";
            referencedColumns: ["regular_club_id"];
          },
          {
            foreignKeyName: "r_c_participation_request_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      regular_club: {
        Row: {
          m_c_id: number;
          regular_club_age: number | null;
          regular_club_approval: boolean;
          regular_club_create_at: string;
          regular_club_gender: string | null;
          regular_club_id: number;
          regular_club_image: string;
          regular_club_introduction: string;
          regular_club_name: string;
          regular_club_people_limited: number | null;
          s_c_id: number | null;
          user_id: string;
        };
        Insert: {
          m_c_id: number;
          regular_club_age?: number | null;
          regular_club_approval?: boolean;
          regular_club_create_at?: string;
          regular_club_gender?: string | null;
          regular_club_id?: number;
          regular_club_image: string;
          regular_club_introduction: string;
          regular_club_name: string;
          regular_club_people_limited?: number | null;
          s_c_id?: number | null;
          user_id?: string;
        };
        Update: {
          m_c_id?: number;
          regular_club_age?: number | null;
          regular_club_approval?: boolean;
          regular_club_create_at?: string;
          regular_club_gender?: string | null;
          regular_club_id?: number;
          regular_club_image?: string;
          regular_club_introduction?: string;
          regular_club_name?: string;
          regular_club_people_limited?: number | null;
          s_c_id?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "regular_club_m_c_id_fkey";
            columns: ["m_c_id"];
            isOneToOne: false;
            referencedRelation: "m_category";
            referencedColumns: ["m_c_id"];
          },
          {
            foreignKeyName: "regular_club_s_c_id_fkey";
            columns: ["s_c_id"];
            isOneToOne: false;
            referencedRelation: "s_category";
            referencedColumns: ["s_c_id"];
          },
          {
            foreignKeyName: "regular_club_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      s_category: {
        Row: {
          m_c_id: number;
          s_c_id: number;
          s_c_name: string;
        };
        Insert: {
          m_c_id: number;
          s_c_id?: number;
          s_c_name: string;
        };
        Update: {
          m_c_id?: number;
          s_c_id?: number;
          s_c_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s_category_m_c_id_fkey";
            columns: ["m_c_id"];
            isOneToOne: false;
            referencedRelation: "m_category";
            referencedColumns: ["m_c_id"];
          }
        ];
      };
      user: {
        Row: {
          user_age: number | null;
          user_create_at: string | null;
          user_email: string | null;
          user_gender: string | null;
          user_id: string;
          user_name: string | null;
          user_profile_img: string | null;
          user_roletype: boolean | null;
        };
        Insert: {
          user_age?: number | null;
          user_create_at?: string | null;
          user_email?: string | null;
          user_gender?: string | null;
          user_id: string;
          user_name?: string | null;
          user_profile_img?: string | null;
          user_roletype?: boolean | null;
        };
        Update: {
          user_age?: number | null;
          user_create_at?: string | null;
          user_email?: string | null;
          user_gender?: string | null;
          user_id?: string;
          user_name?: string | null;
          user_profile_img?: string | null;
          user_roletype?: boolean | null;
        };
        Relationships: [];
      };
      user_attend: {
        Row: {
          user_attend: number;
          user_id: string;
        };
        Insert: {
          user_attend?: number;
          user_id: string;
        };
        Update: {
          user_attend?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_attend_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      wish_list: {
        Row: {
          r_c_id: number | null;
          user_id: string | null;
          wish_list_id: number;
        };
        Insert: {
          r_c_id?: number | null;
          user_id?: string | null;
          wish_list_id?: number;
        };
        Update: {
          r_c_id?: number | null;
          user_id?: string | null;
          wish_list_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "wish_list_r_c_id_fkey";
            columns: ["r_c_id"];
            isOneToOne: false;
            referencedRelation: "regular_club";
            referencedColumns: ["regular_club_id"];
          },
          {
            foreignKeyName: "wish_list_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
