import { supabase } from './supabase';
import type { Database } from './supabase';

type DecisionRequest = Database['public']['Tables']['decision_requests']['Row'];
type DecisionRequestInsert = Database['public']['Tables']['decision_requests']['Insert'];
type DecisionRequestUpdate = Database['public']['Tables']['decision_requests']['Update'];

export async function createDecisionRequest(
  userId: string,
  title: string,
  description: string,
  category: string,
  estimatedValue: number,
  urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium',
  constraints?: Record<string, unknown>
): Promise<{ data: DecisionRequest | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('decision_requests')
      .insert({
        user_id: userId,
        title,
        description,
        category,
        estimated_value: estimatedValue,
        urgency,
        status: 'pending',
        constraints: constraints || null,
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getDecisionRequests(
  userId?: string,
  status?: string
): Promise<{ data: DecisionRequest[] | null; error: Error | null }> {
  try {
    let query = supabase
      .from('decision_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getDecisionRequest(
  id: string
): Promise<{ data: DecisionRequest | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('decision_requests')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateDecisionRequest(
  id: string,
  updates: DecisionRequestUpdate
): Promise<{ data: DecisionRequest | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('decision_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function deleteDecisionRequest(
  id: string
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('decision_requests')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export function subscribeToDecisionRequests(
  userId: string,
  callback: (payload: { eventType: string; new: DecisionRequest; old: DecisionRequest }) => void
) {
  return supabase
    .channel('decision_requests_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'decision_requests',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback({
          eventType: payload.eventType,
          new: payload.new as DecisionRequest,
          old: payload.old as DecisionRequest,
        });
      }
    )
    .subscribe();
}

export function subscribeToAllDecisionRequests(
  callback: (payload: { eventType: string; new: DecisionRequest; old: DecisionRequest }) => void
) {
  return supabase
    .channel('all_decision_requests_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'decision_requests',
      },
      (payload) => {
        callback({
          eventType: payload.eventType,
          new: payload.new as DecisionRequest,
          old: payload.old as DecisionRequest,
        });
      }
    )
    .subscribe();
}
