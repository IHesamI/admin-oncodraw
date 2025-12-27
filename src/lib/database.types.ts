export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          author: string
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string
          author?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          filename: string
          file_url: string
          file_type: string
          file_size: number
          uploaded_at: string
        }
        Insert: {
          id?: string
          filename: string
          file_url: string
          file_type?: string
          file_size?: number
          uploaded_at?: string
        }
        Update: {
          id?: string
          filename?: string
          file_url?: string
          file_type?: string
          file_size?: number
          uploaded_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          email: string
          plan: string
          status: string
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          email: string
          plan?: string
          status?: string
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          plan?: string
          status?: string
          created_at?: string
          expires_at?: string | null
        }
      }
    }
  }
}
