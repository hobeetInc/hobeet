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
      egg_club: {
        Row: {
          egg_club_age: number | null
          egg_club_approval: boolean
          egg_club_create_at: string
          egg_club_gender: string | null
          egg_club_id: number
          egg_club_image: string
          egg_club_introduction: string
          egg_club_name: string
          egg_club_people_limited: number | null
          main_category_id: number
          sub_category_id: number | null
          user_id: string
        }
        Insert: {
          egg_club_age?: number | null
          egg_club_approval?: boolean
          egg_club_create_at?: string
          egg_club_gender?: string | null
          egg_club_id?: number
          egg_club_image: string
          egg_club_introduction: string
          egg_club_name: string
          egg_club_people_limited?: number | null
          main_category_id: number
          sub_category_id?: number | null
          user_id?: string
        }
        Update: {
          egg_club_age?: number | null
          egg_club_approval?: boolean
          egg_club_create_at?: string
          egg_club_gender?: string | null
          egg_club_id?: number
          egg_club_image?: string
          egg_club_introduction?: string
          egg_club_name?: string
          egg_club_people_limited?: number | null
          main_category_id?: number
          sub_category_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "regular_club_main_category_id_fkey"
            columns: ["main_category_id"]
            isOneToOne: false
            referencedRelation: "main_category"
            referencedColumns: ["main_category_id"]
          },
          {
            foreignKeyName: "regular_club_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "sub_category"
            referencedColumns: ["sub_category_id"]
          },
          {
            foreignKeyName: "regular_club_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_club_member: {
        Row: {
          egg_club_id: number
          egg_club_member_id: number
          egg_club_participation_request_id: number | null
          egg_club_request_status: string
          user_id: string
        }
        Insert: {
          egg_club_id: number
          egg_club_member_id?: number
          egg_club_participation_request_id?: number | null
          egg_club_request_status?: string
          user_id: string
        }
        Update: {
          egg_club_id?: number
          egg_club_member_id?: number
          egg_club_participation_request_id?: number | null
          egg_club_request_status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "r_c_member_egg_club_id_fkey"
            columns: ["egg_club_id"]
            isOneToOne: false
            referencedRelation: "egg_club"
            referencedColumns: ["egg_club_id"]
          },
          {
            foreignKeyName: "r_c_member_egg_club_participation_request_id_fkey"
            columns: ["egg_club_participation_request_id"]
            isOneToOne: false
            referencedRelation: "egg_club_participation_request"
            referencedColumns: ["egg_club_participation_request_id"]
          },
          {
            foreignKeyName: "r_c_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_club_participation_request: {
        Row: {
          egg_club_id: number | null
          egg_club_participation_request_approved_date: string | null
          egg_club_participation_request_create_at: string
          egg_club_participation_request_id: number
          egg_club_participation_request_status: string
          user_id: string | null
        }
        Insert: {
          egg_club_id?: number | null
          egg_club_participation_request_approved_date?: string | null
          egg_club_participation_request_create_at?: string
          egg_club_participation_request_id?: number
          egg_club_participation_request_status?: string
          user_id?: string | null
        }
        Update: {
          egg_club_id?: number | null
          egg_club_participation_request_approved_date?: string | null
          egg_club_participation_request_create_at?: string
          egg_club_participation_request_id?: number
          egg_club_participation_request_status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_c_participation_request_egg_club_id_fkey"
            columns: ["egg_club_id"]
            isOneToOne: false
            referencedRelation: "egg_club"
            referencedColumns: ["egg_club_id"]
          },
          {
            foreignKeyName: "r_c_participation_request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_day: {
        Row: {
          egg_club_id: number | null
          egg_day_content: string
          egg_day_create_at: string
          egg_day_date_time: string
          egg_day_id: number
          egg_day_image: string | null
          egg_day_location: string
          egg_day_name: string
          egg_day_tax: number
          user_id: string
        }
        Insert: {
          egg_club_id?: number | null
          egg_day_content: string
          egg_day_create_at?: string
          egg_day_date_time: string
          egg_day_id?: number
          egg_day_image?: string | null
          egg_day_location: string
          egg_day_name: string
          egg_day_tax: number
          user_id?: string
        }
        Update: {
          egg_club_id?: number | null
          egg_day_content?: string
          egg_day_create_at?: string
          egg_day_date_time?: string
          egg_day_id?: number
          egg_day_image?: string | null
          egg_day_location?: string
          egg_day_name?: string
          egg_day_tax?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "r_c_notification_egg_club_id_fkey"
            columns: ["egg_club_id"]
            isOneToOne: false
            referencedRelation: "egg_club"
            referencedColumns: ["egg_club_id"]
          },
          {
            foreignKeyName: "r_c_notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_day_chatting: {
        Row: {
          active: boolean | null
          admin: boolean
          chat_room_entry_time: string | null
          egg_club_id: number
          egg_club_member_id: number
          egg_day_chatting_id: number
          egg_day_chatting_room_id: number
        }
        Insert: {
          active?: boolean | null
          admin?: boolean
          chat_room_entry_time?: string | null
          egg_club_id: number
          egg_club_member_id: number
          egg_day_chatting_id?: number
          egg_day_chatting_room_id: number
        }
        Update: {
          active?: boolean | null
          admin?: boolean
          chat_room_entry_time?: string | null
          egg_club_id?: number
          egg_club_member_id?: number
          egg_day_chatting_id?: number
          egg_day_chatting_room_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "r_c_n_chatting_egg_club_id_fkey"
            columns: ["egg_club_id"]
            isOneToOne: false
            referencedRelation: "egg_club"
            referencedColumns: ["egg_club_id"]
          },
          {
            foreignKeyName: "r_c_n_chatting_egg_club_member_id_fkey"
            columns: ["egg_club_member_id"]
            isOneToOne: false
            referencedRelation: "egg_club_member"
            referencedColumns: ["egg_club_member_id"]
          },
          {
            foreignKeyName: "r_c_n_chatting_egg_day_chatting_room_id_fkey"
            columns: ["egg_day_chatting_room_id"]
            isOneToOne: false
            referencedRelation: "egg_day_chatting_room"
            referencedColumns: ["egg_day_chatting_room_id"]
          },
        ]
      }
      egg_day_chatting_message: {
        Row: {
          egg_club_id: number
          egg_club_member_id: number
          egg_day_chatting_id: number
          egg_day_chatting_message_content: string
          egg_day_chatting_message_create_at: string
          egg_day_chatting_message_id: number
          egg_day_chatting_room_id: number
          user_id: string
        }
        Insert: {
          egg_club_id: number
          egg_club_member_id: number
          egg_day_chatting_id: number
          egg_day_chatting_message_content: string
          egg_day_chatting_message_create_at?: string
          egg_day_chatting_message_id?: number
          egg_day_chatting_room_id: number
          user_id?: string
        }
        Update: {
          egg_club_id?: number
          egg_club_member_id?: number
          egg_day_chatting_id?: number
          egg_day_chatting_message_content?: string
          egg_day_chatting_message_create_at?: string
          egg_day_chatting_message_id?: number
          egg_day_chatting_room_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "r_c_n_chatting_message_egg_club_id_fkey"
            columns: ["egg_club_id"]
            isOneToOne: false
            referencedRelation: "egg_club"
            referencedColumns: ["egg_club_id"]
          },
          {
            foreignKeyName: "r_c_n_chatting_message_egg_club_member_id_fkey"
            columns: ["egg_club_member_id"]
            isOneToOne: false
            referencedRelation: "egg_club_member"
            referencedColumns: ["egg_club_member_id"]
          },
          {
            foreignKeyName: "r_c_n_chatting_message_egg_day_chatting_id_fkey"
            columns: ["egg_day_chatting_id"]
            isOneToOne: false
            referencedRelation: "egg_day_chatting"
            referencedColumns: ["egg_day_chatting_id"]
          },
          {
            foreignKeyName: "r_c_n_chatting_message_egg_day_chatting_room_id_fkey"
            columns: ["egg_day_chatting_room_id"]
            isOneToOne: false
            referencedRelation: "egg_day_chatting_room"
            referencedColumns: ["egg_day_chatting_room_id"]
          },
          {
            foreignKeyName: "r_c_n_chatting_message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_day_chatting_room: {
        Row: {
          egg_club_id: number | null
          egg_day_chatting_room_id: number
          egg_day_chatting_room_name: string
          user_id: string
        }
        Insert: {
          egg_club_id?: number | null
          egg_day_chatting_room_id?: number
          egg_day_chatting_room_name: string
          user_id: string
        }
        Update: {
          egg_club_id?: number | null
          egg_day_chatting_room_id?: number
          egg_day_chatting_room_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "r_c_n_chatting_room_egg_club_id_fkey"
            columns: ["egg_club_id"]
            isOneToOne: true
            referencedRelation: "egg_club"
            referencedColumns: ["egg_club_id"]
          },
        ]
      }
      egg_day_kakaopay: {
        Row: {
          egg_club_id: number | null
          egg_club_member_id: number | null
          egg_day_id: number | null
          egg_day_kakaopay_cid: string | null
          egg_day_kakaopay_create_at: string
          egg_day_kakaopay_id: number
          egg_day_kakaopay_tid: string | null
          user_id: string | null
        }
        Insert: {
          egg_club_id?: number | null
          egg_club_member_id?: number | null
          egg_day_id?: number | null
          egg_day_kakaopay_cid?: string | null
          egg_day_kakaopay_create_at?: string
          egg_day_kakaopay_id?: number
          egg_day_kakaopay_tid?: string | null
          user_id?: string | null
        }
        Update: {
          egg_club_id?: number | null
          egg_club_member_id?: number | null
          egg_day_id?: number | null
          egg_day_kakaopay_cid?: string | null
          egg_day_kakaopay_create_at?: string
          egg_day_kakaopay_id?: number
          egg_day_kakaopay_tid?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "r_c_notification_kakaopay_egg_club_id_fkey"
            columns: ["egg_club_id"]
            isOneToOne: false
            referencedRelation: "egg_club"
            referencedColumns: ["egg_club_id"]
          },
          {
            foreignKeyName: "r_c_notification_kakaopay_egg_club_member_id_fkey"
            columns: ["egg_club_member_id"]
            isOneToOne: false
            referencedRelation: "egg_club_member"
            referencedColumns: ["egg_club_member_id"]
          },
          {
            foreignKeyName: "r_c_notification_kakaopay_egg_day_id_fkey"
            columns: ["egg_day_id"]
            isOneToOne: false
            referencedRelation: "egg_day"
            referencedColumns: ["egg_day_id"]
          },
          {
            foreignKeyName: "r_c_notification_kakaopay_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_day_member: {
        Row: {
          egg_club_member_id: number
          egg_day_id: number
          user_id: string
        }
        Insert: {
          egg_club_member_id?: number
          egg_day_id: number
          user_id?: string
        }
        Update: {
          egg_club_member_id?: number
          egg_day_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "r_c_notification_member_egg_day_id_fkey"
            columns: ["egg_day_id"]
            isOneToOne: false
            referencedRelation: "egg_day"
            referencedColumns: ["egg_day_id"]
          },
          {
            foreignKeyName: "r_c_notification_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_pop: {
        Row: {
          egg_pop_age: number | null
          egg_pop_create_at: string
          egg_pop_date_time: string
          egg_pop_gender: string | null
          egg_pop_id: number
          egg_pop_image: string
          egg_pop_introduction: string
          egg_pop_location: string
          egg_pop_name: string
          egg_pop_people_limited: number | null
          egg_pop_tax: number
          main_category_id: number
          sub_category_id: number
          user_id: string
        }
        Insert: {
          egg_pop_age?: number | null
          egg_pop_create_at?: string
          egg_pop_date_time?: string
          egg_pop_gender?: string | null
          egg_pop_id?: number
          egg_pop_image: string
          egg_pop_introduction: string
          egg_pop_location: string
          egg_pop_name: string
          egg_pop_people_limited?: number | null
          egg_pop_tax: number
          main_category_id: number
          sub_category_id: number
          user_id?: string
        }
        Update: {
          egg_pop_age?: number | null
          egg_pop_create_at?: string
          egg_pop_date_time?: string
          egg_pop_gender?: string | null
          egg_pop_id?: number
          egg_pop_image?: string
          egg_pop_introduction?: string
          egg_pop_location?: string
          egg_pop_name?: string
          egg_pop_people_limited?: number | null
          egg_pop_tax?: number
          main_category_id?: number
          sub_category_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "one_time_club_main_category_id_fkey"
            columns: ["main_category_id"]
            isOneToOne: false
            referencedRelation: "main_category"
            referencedColumns: ["main_category_id"]
          },
          {
            foreignKeyName: "one_time_club_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "sub_category"
            referencedColumns: ["sub_category_id"]
          },
          {
            foreignKeyName: "one_time_club_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_pop_chatting_room: {
        Row: {
          egg_pop_chatting_room_id: number
          egg_pop_chatting_room_name: string
          egg_pop_id: number
          user_id: string
        }
        Insert: {
          egg_pop_chatting_room_id?: number
          egg_pop_chatting_room_name: string
          egg_pop_id: number
          user_id: string
        }
        Update: {
          egg_pop_chatting_room_id?: number
          egg_pop_chatting_room_name?: string
          egg_pop_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "one_time_club_chatting_room_egg_pop_id_fkey"
            columns: ["egg_pop_id"]
            isOneToOne: false
            referencedRelation: "egg_pop"
            referencedColumns: ["egg_pop_id"]
          },
        ]
      }
      egg_pop_chatting_room_member: {
        Row: {
          active: boolean | null
          admin: boolean | null
          created_at: string
          egg_pop_chatting_room_id: number | null
          egg_pop_chatting_room_member_id: number
          egg_pop_id: number | null
          egg_pop_member_id: number | null
        }
        Insert: {
          active?: boolean | null
          admin?: boolean | null
          created_at?: string
          egg_pop_chatting_room_id?: number | null
          egg_pop_chatting_room_member_id?: number
          egg_pop_id?: number | null
          egg_pop_member_id?: number | null
        }
        Update: {
          active?: boolean | null
          admin?: boolean | null
          created_at?: string
          egg_pop_chatting_room_id?: number | null
          egg_pop_chatting_room_member_id?: number
          egg_pop_id?: number | null
          egg_pop_member_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "one_time_club_chatting_room_membe_egg_pop_chatting_room_id_fkey"
            columns: ["egg_pop_chatting_room_id"]
            isOneToOne: false
            referencedRelation: "egg_pop_chatting_room"
            referencedColumns: ["egg_pop_chatting_room_id"]
          },
          {
            foreignKeyName: "one_time_club_chatting_room_member_egg_pop_id_fkey"
            columns: ["egg_pop_id"]
            isOneToOne: false
            referencedRelation: "egg_pop"
            referencedColumns: ["egg_pop_id"]
          },
          {
            foreignKeyName: "one_time_club_chatting_room_member_egg_pop_member_id_fkey"
            columns: ["egg_pop_member_id"]
            isOneToOne: false
            referencedRelation: "egg_pop_member"
            referencedColumns: ["egg_pop_member_id"]
          },
        ]
      }
      egg_pop_chatting_room_message: {
        Row: {
          created_at: string
          egg_pop_chatting_room_id: number | null
          egg_pop_chatting_room_member_id: number | null
          egg_pop_chatting_room_message_content: string | null
          egg_pop_chatting_room_message_id: number
          egg_pop_id: number | null
          egg_pop_member_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          egg_pop_chatting_room_id?: number | null
          egg_pop_chatting_room_member_id?: number | null
          egg_pop_chatting_room_message_content?: string | null
          egg_pop_chatting_room_message_id?: number
          egg_pop_id?: number | null
          egg_pop_member_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          egg_pop_chatting_room_id?: number | null
          egg_pop_chatting_room_member_id?: number | null
          egg_pop_chatting_room_message_content?: string | null
          egg_pop_chatting_room_message_id?: number
          egg_pop_id?: number | null
          egg_pop_member_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "one_time_club_chatting_room_m_egg_pop_chatting_room_member_fkey"
            columns: ["egg_pop_chatting_room_member_id"]
            isOneToOne: false
            referencedRelation: "egg_pop_chatting_room_member"
            referencedColumns: ["egg_pop_chatting_room_member_id"]
          },
          {
            foreignKeyName: "one_time_club_chatting_room_messa_egg_pop_chatting_room_id_fkey"
            columns: ["egg_pop_chatting_room_id"]
            isOneToOne: false
            referencedRelation: "egg_pop_chatting_room"
            referencedColumns: ["egg_pop_chatting_room_id"]
          },
          {
            foreignKeyName: "one_time_club_chatting_room_message_egg_pop_id_fkey"
            columns: ["egg_pop_id"]
            isOneToOne: false
            referencedRelation: "egg_pop"
            referencedColumns: ["egg_pop_id"]
          },
          {
            foreignKeyName: "one_time_club_chatting_room_message_egg_pop_member_id_fkey"
            columns: ["egg_pop_member_id"]
            isOneToOne: false
            referencedRelation: "egg_pop_member"
            referencedColumns: ["egg_pop_member_id"]
          },
          {
            foreignKeyName: "one_time_club_chatting_room_message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_pop_kakaopay: {
        Row: {
          egg_pop_id: number | null
          egg_pop_kakaopay_cid: string | null
          egg_pop_kakaopay_create_at: string
          egg_pop_kakaopay_tid: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          egg_pop_id?: number | null
          egg_pop_kakaopay_cid?: string | null
          egg_pop_kakaopay_create_at?: string
          egg_pop_kakaopay_tid?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          egg_pop_id?: number | null
          egg_pop_kakaopay_cid?: string | null
          egg_pop_kakaopay_create_at?: string
          egg_pop_kakaopay_tid?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "o_t_c_kakaopay_egg_pop_id_fkey"
            columns: ["egg_pop_id"]
            isOneToOne: false
            referencedRelation: "egg_pop"
            referencedColumns: ["egg_pop_id"]
          },
          {
            foreignKeyName: "o_t_c_kakaopay_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      egg_pop_member: {
        Row: {
          egg_pop_id: number
          egg_pop_member_id: number
          user_id: string
        }
        Insert: {
          egg_pop_id: number
          egg_pop_member_id?: number
          user_id: string
        }
        Update: {
          egg_pop_id?: number
          egg_pop_member_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "o_t_c_member_egg_pop_id_fkey"
            columns: ["egg_pop_id"]
            isOneToOne: false
            referencedRelation: "egg_pop"
            referencedColumns: ["egg_pop_id"]
          },
          {
            foreignKeyName: "o_t_c_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      main_category: {
        Row: {
          main_category_id: number
          main_category_name: string
        }
        Insert: {
          main_category_id?: number
          main_category_name: string
        }
        Update: {
          main_category_id?: number
          main_category_name?: string
        }
        Relationships: []
      }
      sub_category: {
        Row: {
          main_category_id: number
          sub_category_id: number
          sub_category_name: string
        }
        Insert: {
          main_category_id: number
          sub_category_id?: number
          sub_category_name: string
        }
        Update: {
          main_category_id?: number
          sub_category_id?: number
          sub_category_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "s_category_main_category_id_fkey"
            columns: ["main_category_id"]
            isOneToOne: false
            referencedRelation: "main_category"
            referencedColumns: ["main_category_id"]
          },
        ]
      }
      user: {
        Row: {
          user_age: number | null
          user_birth: string | null
          user_create_at: string | null
          user_email: string | null
          user_gender: string | null
          user_id: string
          user_name: string | null
          user_profile_img: string | null
          user_roletype: boolean | null
        }
        Insert: {
          user_age?: number | null
          user_birth?: string | null
          user_create_at?: string | null
          user_email?: string | null
          user_gender?: string | null
          user_id: string
          user_name?: string | null
          user_profile_img?: string | null
          user_roletype?: boolean | null
        }
        Update: {
          user_age?: number | null
          user_birth?: string | null
          user_create_at?: string | null
          user_email?: string | null
          user_gender?: string | null
          user_id?: string
          user_name?: string | null
          user_profile_img?: string | null
          user_roletype?: boolean | null
        }
        Relationships: []
      }
      user_attend: {
        Row: {
          user_attend: number
          user_id: string
        }
        Insert: {
          user_attend?: number
          user_id: string
        }
        Update: {
          user_attend?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_attend_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      wish_list: {
        Row: {
          egg_club_id: number | null
          user_id: string | null
          wish_list_id: number
        }
        Insert: {
          egg_club_id?: number | null
          user_id?: string | null
          wish_list_id?: number
        }
        Update: {
          egg_club_id?: number | null
          user_id?: string | null
          wish_list_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wish_list_egg_club_id_fkey"
            columns: ["egg_club_id"]
            isOneToOne: false
            referencedRelation: "egg_club"
            referencedColumns: ["egg_club_id"]
          },
          {
            foreignKeyName: "wish_list_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
