import React from 'react';
import { type ViewType, type UserPlan, type User, type Company } from '../types';
import HamburgerIcon from './icons/HamburgerIcon';

interface HeaderProps {
  currentView: ViewType;
  onLogout: () => void;
  onMenuClick: () => void;
  userPlan: UserPlan;
  currentUser: User | null;
  selectedCompany: Company | null;
}

const viewTitles: Record<ViewType, string> = {
  inicio: 'Inicio',
  orgChart: 'Organigrama',
  jobAnalysis: 'Análisis de Puestos',
  companyManual: 'Manual de Empresa',
  marketing: 'Marketing Estratégico',
  cybersecurity: 'Ciberseguridad',
  regulatoryCompliance: 'Comunicaciones',
  informes: 'Centro de Informes',
  agentesIA: 'Agentes IA',
  planManagement: 'Gestión de Planes',
  selectionProcesses: 'Procesos de Selección',
  payrollManagement: 'Gestión de Nóminas',
  timeTracking: 'Control Horario',
  userManagement: 'Gestión de Usuarios',
  settings: 'Configuración',
  myTeam: 'Mi Equipo',
};

const Header: React.FC<HeaderProps> = ({ currentView, onLogout, onMenuClick, currentUser, selectedCompany }) => {
  const getTitle = () => {
    const baseTitle = viewTitles[currentView] ?? 'Dashboard';

    if (currentUser?.role === 'consultor') {
        if (selectedCompany) {
            const companyName = selectedCompany.name.length > 20 ? `${selectedCompany.name.substring(0, 20)}...` : selectedCompany.name;
            const viewTitle = currentView === 'inicio' ? 'Dashboard Cliente' : baseTitle;
            return `${companyName} - ${viewTitle}`;
        }
        return baseTitle;
    }
    return baseTitle;
  }
  
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="text-slate-500 hover:text-slate-700 focus:outline-none md:hidden mr-4"
          aria-label="Abrir menú"
        >
          <HamburgerIcon />
        </button>
        <h1 className="text-2xl font-semibold text-slate-800">{getTitle()}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-slate-700 font-medium hidden md:block">Bienvenido, {currentUser?.name}</span>
        <div className="relative">
          <button onClick={onLogout} className="flex items-center space-x-2 border border-slate-300 bg-white hover:bg-blue-100 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;