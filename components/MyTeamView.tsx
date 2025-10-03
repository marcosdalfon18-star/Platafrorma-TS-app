import React from 'react';
import { type Employee, type AbsenceRequest, type Absence, type DisciplinaryAction, AbsenceRequestStatus } from '../types';
import UsersIcon from './icons/UsersIcon';
import ClipboardDocumentCheckIcon from './icons/ClipboardDocumentCheckIcon';
import PendingRequestsWidget from './PendingRequestsWidget';
import CompanyCalendar from './CompanyCalendar';

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

interface MyTeamViewProps {
    manager: Employee;
    teamMembers: Employee[];
    absenceRequests: AbsenceRequest[];
    absences: Absence[];
    disciplinaryActions: DisciplinaryAction[];
    onReviewAbsenceRequest: (requestId: number, newStatus: AbsenceRequestStatus.Approved | AbsenceRequestStatus.Rejected) => void;
}

const MyTeamView: React.FC<MyTeamViewProps> = ({
    manager,
    teamMembers,
    absenceRequests,
    absences,
    disciplinaryActions,
    onReviewAbsenceRequest,
}) => {
    const pendingRequests = absenceRequests.filter(req => req.status === AbsenceRequestStatus.Pending);
    const employeeMap = new Map(teamMembers.map(e => [e.id, e]));

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Mi Equipo</h2>
                <p className="text-slate-600 mt-1">Gestione las solicitudes y la planificación de su equipo directo.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 <KpiCard 
                    icon={<UsersIcon className="h-8 w-8 text-blue-600" />}
                    title="Miembros del Equipo" 
                    value={teamMembers.length} 
                    color="bg-blue-100"
                />
                <KpiCard 
                    icon={<ClipboardDocumentCheckIcon className="h-8 w-8 text-yellow-600" />}
                    title="Solicitudes Pendientes" 
                    value={pendingRequests.length} 
                    color="bg-yellow-100"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 space-y-8">
                    {pendingRequests.length > 0 && 
                        <PendingRequestsWidget 
                            requests={pendingRequests}
                            onReviewRequest={onReviewAbsenceRequest}
                            employeeMap={employeeMap}
                        />
                    }
                    <CompanyCalendar 
                        employees={teamMembers} 
                        absences={absences} 
                        disciplinaryActions={disciplinaryActions} 
                    />
                </div>
                <div className="lg:col-span-1 space-y-8">
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Miembros del Equipo</h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {teamMembers.map(member => (
                                <div key={member.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-md">
                                    <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-slate-800">{member.name}</p>
                                        <p className="text-sm text-slate-500">{member.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTeamView;