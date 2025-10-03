import React from 'react';
import { type Company, type Employee, type ViewType, type Absence, type JobOpening, type Communication, type DisciplinaryAction, type AbsenceRequest, AbsenceRequestStatus } from '../types';
import UsersIcon from './icons/UsersIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import MegaphoneIcon from './icons/MegaphoneIcon';
import UserPlusIcon from './icons/UserPlusIcon';
import BriefcasePlusIcon from './icons/BriefcasePlusIcon';
import EmployeeStatusChart from './EmployeeStatusChart';
import CompanyCalendar from './CompanyCalendar';
import ClockIcon from './icons/ClockIcon';
import PendingRequestsWidget from './PendingRequestsWidget';

// --- KpiCard ---
interface KpiCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    color: string;
}
const KpiCard: React.FC<KpiCardProps> = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);


// --- QuickActionsWidget ---
interface QuickActionsWidgetProps {
    onAddEmployee: () => void;
    onAddJobPosition: () => void;
    onAddCommunication: () => void;
}
const QuickActionsWidget: React.FC<QuickActionsWidgetProps> = ({ onAddEmployee, onAddJobPosition, onAddCommunication }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={onAddEmployee} className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <UserPlusIcon />
                <span className="mt-2 text-sm font-semibold text-blue-800">Añadir Empleado</span>
            </button>
            <button onClick={onAddJobPosition} className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <BriefcasePlusIcon />
                <span className="mt-2 text-sm font-semibold text-green-800">Crear Puesto</span>
            </button>
            <button onClick={onAddCommunication} className="flex flex-col items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                <MegaphoneIcon />
                <span className="mt-2 text-sm font-semibold text-yellow-800">Enviar Anuncio</span>
            </button>
        </div>
    </div>
);


// --- RecentCommunicationsWidget ---
interface RecentCommunicationsWidgetProps {
    communications: Communication[];
}
const RecentCommunicationsWidget: React.FC<RecentCommunicationsWidgetProps> = ({ communications }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Comunicaciones Recientes</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
            {communications.slice(0, 3).map(comm => (
                <div key={comm.id} className="p-3 bg-slate-50 rounded-md">
                    <p className="font-semibold text-slate-700 text-sm">{comm.title}</p>
                    <p className="text-xs text-slate-500 truncate">{comm.content}</p>
                </div>
            ))}
             {communications.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No hay comunicaciones.</p>}
        </div>
    </div>
);


// --- Main Component ---
// FIX: Add 'absenceRequests' and 'onReviewAbsenceRequest' to the props interface.
interface CompanyViewProps {
    company: Company;
    employees: Employee[];
    absences: Absence[];
    disciplinaryActions: DisciplinaryAction[];
    jobOpenings: JobOpening[];
    communications: Communication[];
    absenceRequests: AbsenceRequest[];
    onReviewAbsenceRequest: (requestId: number, newStatus: AbsenceRequestStatus.Approved | AbsenceRequestStatus.Rejected) => void;
    setCurrentView: (view: ViewType) => void;
    onAddEmployee: () => void;
}


const CompanyView: React.FC<CompanyViewProps> = ({ 
    company, 
    employees, 
    absences,
    disciplinaryActions,
    jobOpenings,
    communications,
    absenceRequests,
    onReviewAbsenceRequest,
    setCurrentView,
    onAddEmployee
}) => {
    
    const onVacationCount = employees.filter(e => e.status === 'Vacaciones').length;
    const pendingRequests = absenceRequests.filter(req => req.status === AbsenceRequestStatus.Pending);

    return (
        <div className="space-y-8">
            <div>
                 <h2 className="text-3xl font-bold text-slate-800 mb-6">{`Dashboard: ${company.name}`}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KpiCard icon={<UsersIcon className="h-8 w-8 text-blue-600" />} title="Total Empleados" value={employees.length} color="bg-blue-100" />
                    <KpiCard icon={<ClockIcon />} title="Personal en Vacaciones" value={onVacationCount} color="bg-yellow-100" />
                    <KpiCard icon={<BriefcaseIcon className="h-8 w-8 text-green-600" />} title="Puestos Abiertos" value={jobOpenings.length} color="bg-green-100" />
                    <KpiCard icon={<MegaphoneIcon />} title="Comunicaciones" value={communications.length} color="bg-indigo-100" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2 space-y-8">
                        {pendingRequests.length > 0 && 
                            <PendingRequestsWidget 
                                requests={pendingRequests} 
                                onReviewRequest={onReviewAbsenceRequest}
                                employeeMap={new Map(employees.map(e => [e.id, e]))}
                            />
                        }
                        <QuickActionsWidget 
                            onAddEmployee={onAddEmployee} 
                            onAddJobPosition={() => setCurrentView('jobAnalysis')} 
                            onAddCommunication={() => setCurrentView('regulatoryCompliance')}
                        />
                        <CompanyCalendar employees={employees} absences={absences} disciplinaryActions={disciplinaryActions} />
                    </div>
                    <div className="lg:col-span-1 space-y-8">
                        <EmployeeStatusChart employees={employees} />
                        <RecentCommunicationsWidget communications={communications} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyView;
