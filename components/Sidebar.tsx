import React, { useState, useEffect } from 'react';
import { type ViewType, type UserPlan, type User, type Company } from '../types';
import { COMPANY_NAME } from '../constants';
import { hasAccessToView } from '../features';
import HomeIcon from './icons/HomeIcon';
import UsersIcon from './icons/UsersIcon';
import ReportsIcon from './icons/ReportsIcon';
import LockIcon from './icons/LockIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import TagIcon from './icons/TagIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import CubeTransparentIcon from './icons/CubeTransparentIcon';
import SitemapIcon from './icons/SitemapIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import MarketingIcon from './icons/MarketingIcon';
import ShieldIcon from './icons/ShieldIcon';
import BrainIcon from './icons/BrainIcon';
import MegaphoneIcon from './icons/MegaphoneIcon';
import DocumentCurrencyIcon from './icons/DocumentCurrencyIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ClockIcon from './icons/ClockIcon';
import GearIcon from './icons/GearIcon';
import StarIcon from './icons/StarIcon';


interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  userPlan: UserPlan;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUser: User | null;
  selectedCompany: Company | null;
  onBackToDashboard: () => void;
  isManager: boolean;
}

interface NavItem {
    view: ViewType;
    label: string;
    icon: React.ReactNode;
    isCompanySpecific?: boolean;
}

interface NavGroup {
    label: string;
    icon: React.ReactNode;
    isCompanySpecific: boolean;
    subItems: { view: ViewType; label: string, icon?: React.ReactNode }[];
}

type NavConfigItem = NavItem | NavGroup;

const navConfig: Record<User['role'], NavConfigItem[]> = {
    consultor: [
        { view: 'inicio', label: 'Dashboard Global', icon: <HomeIcon /> },
        { view: 'planManagement', label: 'Gestión de Planes', icon: <TagIcon /> },
        { view: 'userManagement', label: 'Gestión de Usuarios', icon: <UsersIcon /> },
        {
            label: 'Gestión de Cliente',
            icon: <UsersIcon />,
            isCompanySpecific: true,
            subItems: [
                { view: 'orgChart', label: 'Organigrama', icon: <SitemapIcon /> },
                { view: 'jobAnalysis', label: 'Análisis de Puestos', icon: <DocumentTextIcon /> },
                { view: 'selectionProcesses', label: 'Procesos de Selección', icon: <BriefcaseIcon /> },
                { view: 'regulatoryCompliance', label: 'Comunicaciones', icon: <MegaphoneIcon /> },
                { view: 'payrollManagement', label: 'Gestión de Nóminas', icon: <DocumentCurrencyIcon /> },
                { view: 'timeTracking', label: 'Control Horario', icon: <ClockIcon /> },
                { view: 'settings', label: 'Configuración', icon: <GearIcon className="h-5 w-5" /> },
            ],
        },
        {
            label: 'Servicios Digitales',
            icon: <CubeTransparentIcon />,
            isCompanySpecific: true,
             subItems: [
                { view: 'marketing', label: 'Marketing Estratégico', icon: <MarketingIcon /> },
                { view: 'cybersecurity', label: 'Ciberseguridad', icon: <ShieldIcon /> },
                { view: 'agentesIA', label: 'Agentes IA', icon: <BrainIcon /> },
            ],
        },
        { view: 'informes', label: 'Informes', icon: <ReportsIcon />, isCompanySpecific: true },
    ],
    empresa: [
        { view: 'inicio', label: 'Dashboard', icon: <HomeIcon /> },
        { view: 'myTeam', label: 'Mi Equipo', icon: <UsersIcon /> }, // Placeholder, shown conditionally
        {
            label: 'Gestión de Talento',
            icon: <UsersIcon />,
            isCompanySpecific: true,
            subItems: [
                { view: 'orgChart', label: 'Organigrama', icon: <SitemapIcon /> },
                { view: 'jobAnalysis', label: 'Análisis de Puestos', icon: <DocumentTextIcon /> },
                { view: 'performanceReviews', label: 'Evaluaciones', icon: <StarIcon /> },
                { view: 'companyManual', label: 'Manual de Empresa', icon: <BookOpenIcon /> },
                { view: 'selectionProcesses', label: 'Procesos de Selección', icon: <BriefcaseIcon /> },
                { view: 'payrollManagement', label: 'Gestión de Nóminas', icon: <DocumentCurrencyIcon /> },
                { view: 'timeTracking', label: 'Control Horario', icon: <ClockIcon /> },
            ],
        },
        { view: 'regulatoryCompliance', label: 'Comunicaciones', icon: <MegaphoneIcon /> },
        {
            label: 'Servicios Digitales',
            icon: <CubeTransparentIcon />,
            isCompanySpecific: true,
            subItems: [
                { view: 'marketing', label: 'Marketing Estratégico', icon: <MarketingIcon /> },
                { view: 'cybersecurity', label: 'Ciberseguridad', icon: <ShieldIcon /> },
                { view: 'agentesIA', label: 'Agentes IA', icon: <BrainIcon /> },
            ],
        },
        { view: 'informes', label: 'Informes', icon: <ReportsIcon /> },
        { view: 'settings', label: 'Configuración', icon: <GearIcon className="h-6 w-6" /> },
    ],
    empleado: [
        { view: 'inicio', label: 'Inicio', icon: <HomeIcon /> },
        { view: 'regulatoryCompliance', label: 'Comunicaciones', icon: <MegaphoneIcon /> },
        { view: 'myTeam', label: 'Mi Equipo', icon: <UsersIcon /> }, // Placeholder, shown conditionally
        { view: 'performanceReviews', label: 'Mis Evaluaciones', icon: <StarIcon /> },
        { view: 'timeTracking', label: 'Control Horario', icon: <ClockIcon /> },
        { view: 'jobAnalysis', label: 'Análisis de Puesto', icon: <UsersIcon /> },
        { view: 'companyManual', label: 'Manual de Empresa', icon: <BookOpenIcon /> },
    ],
    gestor: [
        { view: 'inicio', label: 'Inicio', icon: <HomeIcon /> },
        { view: 'payrollManagement', label: 'Gestión de Nóminas', icon: <DocumentCurrencyIcon /> },
        { view: 'regulatoryCompliance', label: 'Comunicaciones', icon: <MegaphoneIcon /> },
        { view: 'companyManual', label: 'Manual de Empresa', icon: <BookOpenIcon /> },
        { view: 'timeTracking', label: 'Control Horario', icon: <ClockIcon /> },
    ],
};

const NavButton: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    isDisabled?: boolean;
    tooltip?: string;
    onClick: () => void;
    children?: React.ReactNode;
}> = ({ label, icon, isActive, isDisabled = false, tooltip, onClick, children }) => (
    <li className="relative group">
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`flex items-center justify-between w-full px-4 py-3 my-1 rounded-lg transition-all duration-300 ${
                isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : isDisabled
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-blue-100 hover:text-blue-800'
            }`}
        >
            <div className="flex items-center">
                <span className="mr-3">{icon}</span>
                <span className="font-medium">{label}</span>
            </div>
            {children}
        </button>
        {isDisabled && tooltip && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {tooltip}
            </div>
        )}
    </li>
);

const SubNavButton: React.FC<{
    label: string;
    icon?: React.ReactNode;
    isActive: boolean;
    isDisabled: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, isDisabled, onClick }) => (
    <li className="relative group/sub">
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`w-full text-left px-3 py-2 my-0.5 rounded-md text-sm transition-colors flex justify-between items-center ${
                isActive
                    ? 'font-semibold text-blue-700 bg-blue-50'
                    : isDisabled 
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-700'
            }`}
        >
            <span className="flex items-center gap-2">
                {icon}
                {label}
            </span>
            {isDisabled && <LockIcon />}
        </button>
        {isDisabled && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/sub:opacity-100 transition-opacity z-50">
                Necesita un plan superior
            </div>
        )}
    </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, userPlan, isOpen, setIsOpen, currentUser, selectedCompany, onBackToDashboard, isManager }) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!currentUser) return;
    const config = navConfig[currentUser.role];
    const activeGroup = config.find(item => 
        'subItems' in item && item.subItems.some(sub => sub.view === currentView)
    ) as NavGroup | undefined;

    if (activeGroup) {
        setOpenGroups(prev => ({ ...prev, [activeGroup.label]: true }));
    }
  }, [currentView, currentUser]);
  
  useEffect(() => {
      if(currentUser?.role === 'consultor' && !selectedCompany) {
          setOpenGroups({});
      }
  }, [selectedCompany, currentUser?.role]);

  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    if (window.innerWidth < 768) {
        setIsOpen(false);
    }
  };

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const renderConsultantMenu = () => {
    if (selectedCompany) {
      return (
        <>
          <li className="px-4 py-3 text-gray-500 text-sm font-semibold uppercase">Menú de Gestión</li>
          <li>
            <button
              onClick={onBackToDashboard}
              className="flex items-center w-full px-4 py-3 my-1 rounded-lg transition-all duration-300 text-gray-600 hover:bg-blue-100 hover:text-blue-800"
            >
              <span className="mr-3"><ArrowLeftIcon /></span>
              <span className="font-medium">Volver al Dashboard</span>
            </button>
          </li>
          <NavButton 
            label="Dashboard Cliente" 
            icon={<HomeIcon />} 
            isActive={currentView === 'inicio'} 
            onClick={() => handleNavigation('inicio')} 
          />
          
          {navConfig.consultor.map((item, index) => {
            if (!item.isCompanySpecific) return null;

            if ('subItems' in item) {
              const group = item;
              const isActive = group.subItems.some(sub => sub.view === currentView);
              const isGroupOpen = openGroups[group.label];
              return (
                <div key={index}>
                  <NavButton label={group.label} icon={group.icon} isActive={isActive} onClick={() => toggleGroup(group.label)}>
                    <ChevronDownIcon className={`transition-transform duration-300 ${isGroupOpen ? 'rotate-180' : ''}`} />
                  </NavButton>
                  {isGroupOpen && (
                    <ul className="pl-8 pt-1 pb-1 transition-all duration-500">
                      {group.subItems.map(subItem => (
                        <SubNavButton 
                          key={subItem.view} 
                          label={subItem.label} 
                          icon={subItem.icon} 
                          isActive={currentView === subItem.view} 
                          isDisabled={false}
                          onClick={() => handleNavigation(subItem.view)} 
                        />
                      ))}
                    </ul>
                  )}
                </div>
              );
            } else {
              return (
                <NavButton 
                  key={index} 
                  label={item.label} 
                  icon={item.icon} 
                  isActive={currentView === item.view} 
                  onClick={() => handleNavigation(item.view)} 
                />
              );
            }
          })}
        </>
      );
    } 
    else {
      return (
        <>
          <li className="px-4 py-3 text-gray-500 text-sm font-semibold uppercase">Menú Global</li>
          {navConfig.consultor.map((item, index) => {
            if ('subItems' in item) {
              return (
                <NavButton key={index} label={item.label} icon={item.icon} isActive={false} isDisabled={true} tooltip="Seleccione una empresa" onClick={() => {}}>
                  <LockIcon />
                </NavButton>
              );
            } else {
              return (
                <NavButton key={index} label={item.label} icon={item.icon} isActive={currentView === item.view} isDisabled={item.isCompanySpecific} tooltip={item.isCompanySpecific ? "Seleccione una empresa" : undefined} onClick={() => !item.isCompanySpecific && handleNavigation(item.view)} />
              )
            }
          })}
        </>
      );
    }
  };
  
  const renderStandardMenu = (role: 'empresa' | 'empleado' | 'gestor') => {
    const config = navConfig[role];
    return (
      <>
        <li className="px-4 py-3 text-gray-500 text-sm font-semibold uppercase">{role === 'empresa' ? 'Mi Empresa' : `Portal ${role.charAt(0).toUpperCase() + role.slice(1)}`}</li>
        {config.map((item, index) => {
          if ('view' in item && item.view === 'myTeam' && !isManager) {
            return null;
          }

          if ('subItems' in item) {
            const group = item;
            const isActive = group.subItems.some(sub => sub.view === currentView);
            const isGroupOpen = openGroups[group.label];
            return (
              <div key={index}>
                <NavButton label={group.label} icon={group.icon} isActive={isActive} onClick={() => toggleGroup(group.label)}>
                  <ChevronDownIcon className={`transition-transform duration-300 ${isGroupOpen ? 'rotate-180' : ''}`} />
                </NavButton>
                {isGroupOpen && (
                  <ul className="pl-8 pt-1 pb-1 transition-all duration-500">
                    {group.subItems.map(subItem => {
                      const hasAccess = hasAccessToView(role, userPlan, subItem.view);
                      return <SubNavButton key={subItem.view} label={subItem.label} icon={subItem.icon} isActive={currentView === subItem.view} isDisabled={!hasAccess} onClick={() => hasAccess && handleNavigation(subItem.view)} />;
                    })}
                  </ul>
                )}
              </div>
            );
          } else {
            const navItem = item as NavItem;
            const hasAccess = hasAccessToView(role, userPlan, navItem.view);
            const shouldHide = !hasAccess && (role === 'empleado' || role === 'gestor');
            if (shouldHide) return null;
            return <NavButton key={index} label={navItem.label} icon={navItem.icon} isActive={currentView === navItem.view} isDisabled={!hasAccess} tooltip="Necesita un plan superior" onClick={() => hasAccess && handleNavigation(navItem.view)} />;
          }
        })}
      </>
    );
  };
  
  const renderMenu = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case 'consultor': return renderConsultantMenu();
      case 'empresa':
      case 'empleado':
      case 'gestor':
        return renderStandardMenu(currentUser.role);
      default:
        return null;
    }
  };

  return (
    <div className={`w-64 bg-white text-gray-800 flex flex-col fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#4A5A5B]">{COMPANY_NAME}</h1>
      </div>
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul>
            {renderMenu()}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-800 font-semibold">Plataforma Digital</p>
            <p className="text-xs text-blue-700 mt-1">&copy; 2024. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;