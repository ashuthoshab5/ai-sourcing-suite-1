import { supabase } from './supabase';

interface DecisionMetrics {
  total: number;
  pending: number;
  analyzing: number;
  evaluating: number;
  optimizing: number;
  reviewing: number;
  approved: number;
  rejected: number;
  completed: number;
  avgConfidence: number;
  totalValue: number;
}

interface CategoryMetrics {
  category: string;
  count: number;
  totalValue: number;
  avgConfidence: number;
}

interface UrgencyMetrics {
  urgency: string;
  count: number;
  totalValue: number;
}

export async function getDecisionMetrics(): Promise<{
  data: DecisionMetrics | null;
  error: Error | null;
}> {
  try {
    const { data: requests, error } = await supabase
      .from('decision_requests')
      .select('status, confidence_score, estimated_value');

    if (error) throw error;

    const metrics: DecisionMetrics = {
      total: requests?.length || 0,
      pending: requests?.filter((r) => r.status === 'pending').length || 0,
      analyzing: requests?.filter((r) => r.status === 'analyzing').length || 0,
      evaluating: requests?.filter((r) => r.status === 'evaluating').length || 0,
      optimizing: requests?.filter((r) => r.status === 'optimizing').length || 0,
      reviewing: requests?.filter((r) => r.status === 'reviewing').length || 0,
      approved: requests?.filter((r) => r.status === 'approved').length || 0,
      rejected: requests?.filter((r) => r.status === 'rejected').length || 0,
      completed: requests?.filter((r) => r.status === 'completed').length || 0,
      avgConfidence:
        requests?.filter((r) => r.confidence_score !== null).reduce((sum, r) => sum + (r.confidence_score || 0), 0) /
          (requests?.filter((r) => r.confidence_score !== null).length || 1) || 0,
      totalValue: requests?.reduce((sum, r) => sum + (r.estimated_value || 0), 0) || 0,
    };

    return { data: metrics, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getCategoryMetrics(): Promise<{
  data: CategoryMetrics[] | null;
  error: Error | null;
}> {
  try {
    const { data: requests, error } = await supabase
      .from('decision_requests')
      .select('category, estimated_value, confidence_score');

    if (error) throw error;

    const categoryMap = new Map<string, { count: number; totalValue: number; confidenceSum: number }>();

    requests?.forEach((r) => {
      const existing = categoryMap.get(r.category) || { count: 0, totalValue: 0, confidenceSum: 0 };
      categoryMap.set(r.category, {
        count: existing.count + 1,
        totalValue: existing.totalValue + (r.estimated_value || 0),
        confidenceSum: existing.confidenceSum + (r.confidence_score || 0),
      });
    });

    const metrics: CategoryMetrics[] = Array.from(categoryMap.entries()).map(([category, stats]) => ({
      category,
      count: stats.count,
      totalValue: stats.totalValue,
      avgConfidence: stats.count > 0 ? stats.confidenceSum / stats.count : 0,
    }));

    return { data: metrics, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getUrgencyMetrics(): Promise<{
  data: UrgencyMetrics[] | null;
  error: Error | null;
}> {
  try {
    const { data: requests, error } = await supabase
      .from('decision_requests')
      .select('urgency, estimated_value');

    if (error) throw error;

    const urgencyMap = new Map<string, { count: number; totalValue: number }>();

    requests?.forEach((r) => {
      const existing = urgencyMap.get(r.urgency) || { count: 0, totalValue: 0 };
      urgencyMap.set(r.urgency, {
        count: existing.count + 1,
        totalValue: existing.totalValue + (r.estimated_value || 0),
      });
    });

    const metrics: UrgencyMetrics[] = Array.from(urgencyMap.entries()).map(([urgency, stats]) => ({
      urgency,
      count: stats.count,
      totalValue: stats.totalValue,
    }));

    return { data: metrics, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getRecentDecisions(limit: number = 10): Promise<{
  data: any[] | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from('decision_requests')
      .select(
        `
        id,
        title,
        status,
        urgency,
        estimated_value,
        confidence_score,
        created_at,
        profiles (
          full_name,
          department
        )
      `
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
