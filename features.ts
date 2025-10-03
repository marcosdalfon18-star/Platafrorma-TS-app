import { type UserPlan, type ViewType, type Feature, type User } from './types';

type PlanFeatures = {
  views: ViewType[];
  features: Feature[];
};

const featureConfig: Record<UserPlan, PlanFeatures> = {
  plan_basico: {
    views: [
      'inicio',
      'orgChart',
      'jobAnalysis',
      'companyManual',
    ],
    features: [],
  },
  plan_profesional: {
    views: [
      'inicio',
      'orgChart',
      'jobAnalysis',
      'companyManual',
      'informes',
      'regulatoryCompliance', // Communications added
      'selectionProcesses',
      'payrollManagement',
      'timeTracking',
      'performanceReviews',
    ],
    features: ['aiJobDescription', 'aiChatbot'],
  },
  plan_premium: {
    views: [
      'inicio',
      'orgChart',
      'jobAnalysis',
      'companyManual',
      'informes',
      'regulatoryCompliance', // Communications added
      'selectionProcesses',
      'payrollManagement',
      'marketing',
      'cybersecurity',
      'agentesIA',
      'timeTracking',
      'performanceReviews',
    ],
    features: ['aiJobDescription', 'aiChatbot'],
  },
};

const roleAllowedViews: Record<User['role'], ViewType[]> = {
    consultor: [ // Consultant can access everything, plan is the limiter
        'inicio', 'orgChart', 'jobAnalysis', 'companyManual', 'marketing', 'cybersecurity',
        'regulatoryCompliance', 'informes', 'agentesIA', 'planManagement', 'selectionProcesses',
        'payrollManagement', 'timeTracking', 'performanceReviews'
    ],
    empresa: [
        'inicio', 'orgChart', 'jobAnalysis', 'companyManual', 'selectionProcesses', 'informes',
        'marketing', 'cybersecurity', 'agentesIA', 'regulatoryCompliance', 'payrollManagement', 'timeTracking', 'performanceReviews'
    ],
    empleado: ['inicio', 'jobAnalysis', 'companyManual', 'timeTracking', 'performanceReviews', 'regulatoryCompliance'],
    gestor: ['inicio', 'payrollManagement', 'regulatoryCompliance', 'companyManual'],
};


export const hasAccessToView = (role: User['role'], plan: UserPlan, view: ViewType): boolean => {
    // Rule for gestor first, as it's special and doesn't depend on plan
    if (role === 'gestor') {
        return roleAllowedViews.gestor.includes(view);
    }
    
    // For all other roles, check if role is allowed first
    if (!roleAllowedViews[role]?.includes(view)) {
        return false;
    }

    // For consultant, there's a special case
    if (role === 'consultor' && view === 'planManagement') {
        return true;
    }
    
    // For consultant, empresa, and empleado, check against the plan features
    return featureConfig[plan]?.views.includes(view) ?? false;
};


export const hasAccessToFeature = (plan: UserPlan, feature: Feature): boolean => {
  return featureConfig[plan]?.features.includes(feature) ?? false;
};