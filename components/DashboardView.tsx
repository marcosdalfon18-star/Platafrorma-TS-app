import React, { useMemo, useState } from 'react';
// FIX: Import Activity type to be used in ActivityFeedWidget.
import { type Employee, type UserPlan, type Company, type Plan, type Activity, type ViewType } from '../types';
import SearchIcon from './icons/SearchIcon';
import UsersIcon from './icons/UsersIcon';

// Define Plan colors to match the screenshot
const planColors: Record<UserPlan, { bg: string; text: string }> = {
    plan_basico: { bg: 'bg-green-100', text: 'text-green-800' },
    plan_profesional: { bg: 'bg-blue-100', text: 'text-blue-800' },
    plan_premium: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
};

interface CompanyCardProps {
    company: Company;
    employeeCount: number;
    planName: string;
    onSelect: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, employeeCount, planName, onSelect }) => {
    const colors = planColors[company.planId] || planColors.plan_basico;
    
    // Fallback logic for plan name colors based on name if ID doesn't match
    const planNameLower = planName.toLowerCase();
    let badgeColor = colors;
    if (planNameLower.includes('premium')) {
      badgeColor = planColors['plan_premium'];
    } else if (planNameLower.includes('profesional')) {
      badgeColor = planColors['plan_profesional'];
    } else if (planNameLower.includes('básico')) {
      badgeColor = planColors['plan_basico'];
    }


    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <img className="h-32 w-full object-cover" src={company.imageUrl} alt={`${company.name} office`} />
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <img className="h-16 w-16 rounded-full border-4 border-white -mt-16 shadow-lg" src={company.logoUrl} alt={`${company.name} logo`} />
                    <div className="mt-[-2rem]">
                        <div className="text-xl font-bold text-slate-800">{company.name}</div>
                        <p className="text-sm text-slate-500">{company.industry}</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-slate-600">
                    <div className="flex items-center">
                        <UsersIcon />
                        <span className="ml-2">{employeeCount} Empleados</span>
                    </div>
                    <span className={`px-3 py-1 font-semibold rounded-full text-xs ${badgeColor.bg} ${badgeColor.text}`}>
                        {planName}
                    </span>
                </div>
                <div className="mt-6">
                    <button
                        onClick={onSelect}
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

interface DashboardViewProps {
  companies: Company[];
  employees: Employee[];
  plans: Plan[];
  activities: Activity[];
  onSelectCompany: (company: Company) => void;
  setCurrentView: (view: ViewType) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ companies, employees, plans, activities, onSelectCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const employeeCountByCompany = useMemo(() => {
    const counts = new Map<number, number>();
    employees.forEach(emp => {
        counts.set(emp.companyId, (counts.get(emp.companyId) || 0) + 1);
    });
    return counts;
  }, [employees]);
  
  const planNameById = useMemo(() => {
    const map = new Map<UserPlan, string>();
    plans.forEach(plan => map.set(plan.id, plan.name));
    return map;
  }, [plans]);

  const filteredCompanies = useMemo(() => {
      if (!searchTerm) return companies;
      return companies.filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [companies, searchTerm]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-slate-800">SME Management</h2>
          <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
              </div>
              <input
                  type="text"
                  placeholder="Search SMEs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
          </div>
        </div>
        
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompanies.map(company => (
                  <CompanyCard 
                      key={company.id}
                      company={company}
                      employeeCount={employeeCountByCompany.get(company.id) || 0}
                      planName={planNameById.get(company.planId) || 'N/A'}
                      onSelect={() => onSelectCompany(company)}
                  />
              ))}
          </div>
        ) : (
            <div className="text-center py-20 col-span-full bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-slate-700">No se encontraron empresas</h3>
                <p className="text-slate-500 mt-1">Intente ajustar su búsqueda.</p>
            </div>
        )}
      </div>
      <div className="lg:col-span-1">
        <ActivityFeedWidget activities={activities} companies={companies} title="Actividad Global Reciente" />
      </div>
    </div>
  );
};

// FIX: Define and export the missing ActivityFeedWidget component.
export const ActivityFeedWidget: React.FC<{ activities: Activity[]; companies?: Company[]; title: string; }> = ({ activities, companies, title }) => {
    const companyMap = useMemo(() => {
        if (!companies) return new Map();
        return new Map(companies.map(c => [c.id, c.name]));
    }, [companies]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full sticky top-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">{title}</h3>
            <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                {activities.length > 0 ? activities.slice(0, 20).map(activity => {
                    const companyName = activity.companyId && companies ? companyMap.get(activity.companyId) : null;
                    return (
                        <div key={activity.id} className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full mt-1 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                {companyName && <p className="text-xs font-bold text-blue-700">{companyName}</p>}
                                <p className="text-sm text-slate-700">{activity.description}</p>
                                <p className="text-xs text-slate-500">{new Date(activity.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    );
                }) : (
                    <p className="text-center text-slate-500 py-8">No hay actividad reciente.</p>
                )}
            </div>
        </div>
    );
};


export default DashboardView;