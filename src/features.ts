// Centralización de features y acceso por rol

export type Role = 'consultor' | 'empresa' | 'empleado' | 'gestor';

export const FEATURES: Record<Role, string[]> = {
  consultor: [
    'dashboard', 'empresas', 'empleados', 'reportes', 'logAsesorias', 'gestionUsuarios'
  ],
  empresa: [
    'dashboard', 'empleados', 'plan', 'reportes', 'marketing', 'cumplimiento', 'nomina', 'organigrama', 'manual', 'seleccion', 'tiempo', 'documentos'
  ],
  empleado: [
    'dashboard', 'miEquipo', 'ausencias', 'revisiones', 'tiempo', 'documentos'
  ],
  gestor: [
    'dashboard', 'gestionUsuarios', 'reportes', 'empresas', 'empleados'
  ]
};

export function hasAccessToFeature(role: Role, feature: string): boolean {
  return FEATURES[role]?.includes(feature);
}
