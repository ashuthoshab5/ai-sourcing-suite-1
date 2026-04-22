import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          department: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: string;
          department?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: string;
          department?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      decision_requests: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          estimated_value: number;
          urgency: 'low' | 'medium' | 'high' | 'critical';
          status: 'pending' | 'analyzing' | 'evaluating' | 'optimizing' | 'reviewing' | 'approved' | 'rejected' | 'completed';
          confidence_score: number | null;
          ai_analysis: Json | null;
          preferred_suppliers: string[] | null;
          constraints: Json | null;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          estimated_value: number;
          urgency?: 'low' | 'medium' | 'high' | 'critical';
          status?: 'pending' | 'analyzing' | 'evaluating' | 'optimizing' | 'reviewing' | 'approved' | 'rejected' | 'completed';
          confidence_score?: number | null;
          ai_analysis?: Json | null;
          preferred_suppliers?: string[] | null;
          constraints?: Json | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          category?: string;
          estimated_value?: number;
          urgency?: 'low' | 'medium' | 'high' | 'critical';
          status?: 'pending' | 'analyzing' | 'evaluating' | 'optimizing' | 'reviewing' | 'approved' | 'rejected' | 'completed';
          confidence_score?: number | null;
          ai_analysis?: Json | null;
          preferred_suppliers?: string[] | null;
          constraints?: Json | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
      };
      suppliers: {
        Row: {
          id: string;
          name: string;
          category: string;
          location: string;
          contact_email: string;
          contact_phone: string | null;
          website: string | null;
          risk_score: number;
          risk_level: 'low' | 'medium' | 'high' | 'critical';
          performance_score: number;
          contract_value: number;
          active_contracts: number;
          certifications: string[] | null;
          last_assessment: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          location: string;
          contact_email: string;
          contact_phone?: string | null;
          website?: string | null;
          risk_score?: number;
          risk_level?: 'low' | 'medium' | 'high' | 'critical';
          performance_score?: number;
          contract_value?: number;
          active_contracts?: number;
          certifications?: string[] | null;
          last_assessment?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          location?: string;
          contact_email?: string;
          contact_phone?: string | null;
          website?: string | null;
          risk_score?: number;
          risk_level?: 'low' | 'medium' | 'high' | 'critical';
          performance_score?: number;
          contract_value?: number;
          active_contracts?: number;
          certifications?: string[] | null;
          last_assessment?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      decision_outcomes: {
        Row: {
          id: string;
          decision_request_id: string;
          supplier_id: string | null;
          outcome_type: 'single_supplier' | 'multi_supplier' | 'negotiated' | 'manual_override';
          final_value: number;
          savings_achieved: number;
          savings_percentage: number;
          execution_status: 'pending' | 'in_progress' | 'completed' | 'failed';
          user_satisfaction: number | null;
          lessons_learned: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          decision_request_id: string;
          supplier_id?: string | null;
          outcome_type?: 'single_supplier' | 'multi_supplier' | 'negotiated' | 'manual_override';
          final_value?: number;
          savings_achieved?: number;
          savings_percentage?: number;
          execution_status?: 'pending' | 'in_progress' | 'completed' | 'failed';
          user_satisfaction?: number | null;
          lessons_learned?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          decision_request_id?: string;
          supplier_id?: string | null;
          outcome_type?: 'single_supplier' | 'multi_supplier' | 'negotiated' | 'manual_override';
          final_value?: number;
          savings_achieved?: number;
          savings_percentage?: number;
          execution_status?: 'pending' | 'in_progress' | 'completed' | 'failed';
          user_satisfaction?: number | null;
          lessons_learned?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      agent_activities: {
        Row: {
          id: string;
          agent_type: 'requirement' | 'discovery' | 'evaluation' | 'optimization' | 'negotiation' | 'learning' | 'verification';
          decision_request_id: string | null;
          status: 'idle' | 'active' | 'processing' | 'completed';
          current_task: string | null;
          performance_score: number;
          tasks_completed: number;
          last_activity: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          agent_type: 'requirement' | 'discovery' | 'evaluation' | 'optimization' | 'negotiation' | 'learning' | 'verification';
          decision_request_id?: string | null;
          status?: 'idle' | 'active' | 'processing' | 'completed';
          current_task?: string | null;
          performance_score?: number;
          tasks_completed?: number;
          last_activity?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          agent_type?: 'requirement' | 'discovery' | 'evaluation' | 'optimization' | 'negotiation' | 'learning' | 'verification';
          decision_request_id?: string | null;
          status?: 'idle' | 'active' | 'processing' | 'completed';
          current_task?: string | null;
          performance_score?: number;
          tasks_completed?: number;
          last_activity?: string;
          created_at?: string;
          updated_at?: string;
        };
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
  };
}
