import { supabase } from './supabase';
import type { Database } from './supabase';

type Supplier = Database['public']['Tables']['suppliers']['Row'];

export async function getSuppliers(
  category?: string,
  riskLevel?: string
): Promise<{ data: Supplier[] | null; error: Error | null }> {
  try {
    let query = supabase
      .from('suppliers')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (riskLevel) {
      query = query.eq('risk_level', riskLevel);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getSupplier(
  id: string
): Promise<{ data: Supplier | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function searchSuppliers(
  searchTerm: string
): Promise<{ data: Supplier[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`)
      .order('performance_score', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export function subscribeToSuppliers(
  callback: (payload: { eventType: string; new: Supplier; old: Supplier }) => void
) {
  return supabase
    .channel('suppliers_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'suppliers',
      },
      (payload) => {
        callback({
          eventType: payload.eventType,
          new: payload.new as Supplier,
          old: payload.old as Supplier,
        });
      }
    )
    .subscribe();
}
