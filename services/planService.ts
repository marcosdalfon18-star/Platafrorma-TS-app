// planService.ts
import { Plan } from '../types';

export type PlanType = 'basico' | 'profesional' | 'premium';

export const PLAN_LABELS: Record<PlanType, string> = {
  basico: 'Básico',
  profesional: 'Profesional',
  premium: 'Premium',
};

export const PLAN_FEATURES: Record<PlanType, string[]> = {
  basico: ['dashboard', 'employees'],
  profesional: ['dashboard', 'employees', 'payroll', 'reports'],
  premium: ['dashboard', 'employees', 'payroll', 'reports', 'advisory', 'aiJobDescription', 'aiChatbot'],
};

export function getFeaturesByPlan(plan: PlanType): string[] {
  return PLAN_FEATURES[plan] ?? [];
}

export function canAccessFeatureByPlan(plan: PlanType, feature: string): boolean {
  return getFeaturesByPlan(plan).includes(feature);
}

export function getPlanLabel(plan: PlanType): string {
  return PLAN_LABELS[plan] ?? plan;
}
