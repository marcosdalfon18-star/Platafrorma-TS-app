// rolesService.ts
import { UserRole } from '../types';

export const ROLES: UserRole[] = ['consultor', 'empresa', 'empleado', 'gestor'];

export const ROLE_LABELS: Record<UserRole, string> = {
  consultor: 'Consultor',
  empresa: 'Empresa',
  empleado: 'Empleado',
  gestor: 'Gestor',
};

export const ROLE_FEATURES: Record<UserRole, string[]> = {
  consultor: ['dashboard', 'reports', 'advisory', 'companies'],
  empresa: ['dashboard', 'employees', 'payroll', 'reports', 'settings'],
  empleado: ['dashboard', 'myTeam', 'performanceReviews', 'absenceRequests'],
  gestor: ['dashboard', 'userManagement', 'reports', 'settings'],
};

export function getFeaturesByRole(role: UserRole): string[] {
  return ROLE_FEATURES[role] ?? [];
}

export function canAccessFeature(role: UserRole, feature: string): boolean {
  return getFeaturesByRole(role).includes(feature);
}
