import React, { useState, useMemo } from 'react';
import { type Employee, type Absence, AbsenceType, type DisciplinaryAction, DisciplinaryActionType } from '../types';
import ArrowLeftCircleIcon from './icons/ArrowLeftCircleIcon';
import ArrowRightCircleIcon from './icons/ArrowRightCircleIcon';

interface CompanyCalendarProps {
    employees: Employee[];
    absences: Absence[];
    disciplinaryActions: DisciplinaryAction[];
}

type CalendarEvent = (Absence & { eventType: 'absence' }) | (DisciplinaryAction & { eventType: 'action' });

const absenceColors: Record<AbsenceType, { bg: string; text: string; emoji: string }> = {
    [AbsenceType.Vacation]: { bg: 'bg-yellow-100', text: 'text-yellow-800', emoji: '🌴' },
    [AbsenceType.SickLeave]: { bg: 'bg-red-100', text: 'text-red-800', emoji: '🤒' },
    [AbsenceType.Other]: { bg: 'bg-slate-100', text: 'text-slate-800', emoji: '🗓️' },
};

const actionColors: Record<DisciplinaryActionType, { bg: string; text: string; emoji: string }> = {
    [DisciplinaryActionType.WrittenWarning]: { bg: 'bg-yellow-100', text: 'text-yellow-800', emoji: '📝' },
    [DisciplinaryActionType.Suspension]: { bg: 'bg-orange-100', text: 'text-orange-800', emoji: '⛔' },
    [DisciplinaryActionType.Termination]: { bg: 'bg-red-100', text: 'text-red-800', emoji: '❌' },
    [DisciplinaryActionType.UnjustifiedAbsenceWarning]: { bg: 'bg-indigo-100', text: 'text-indigo-800', emoji: '❓' },
};

const CompanyCalendar: React.FC<CompanyCalendarProps> = ({ employees, absences, disciplinaryActions }) => {
    const [currentDate, setCurrentDate] = useState(new Date('2024-08-01T00:00:00')); // Set a fixed date for consistent display with mock data
    const [detailModalData, setDetailModalData] = useState<{ date: string; events: CalendarEvent[] } | null>(null);

    const employeeMap = useMemo(() => {
        return new Map(employees.map(e => [e.id, e]));
    }, [employees]);

    const absencesByDate = useMemo(() => {
        const map = new Map<string, Absence[]>();
        absences.forEach(absence => {
            const start = new Date(absence.startDate + 'T00:00:00');
            const end = new Date(absence.endDate + 'T00:00:00');
            
            let currentDate = new Date(start);

            while (currentDate <= end) {
                 const dateKey = currentDate.toISOString().split('T')[0];
                 if (!map.has(dateKey)) {
                     map.set(dateKey, []);
                 }
                 map.get(dateKey)!.push(absence);
                 currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return map;
    }, [absences]);
    
    const actionsByDate = useMemo(() => {
        const map = new Map<string, DisciplinaryAction[]>();
        disciplinaryActions.forEach(action => {
            const dateKey = action.date;
            if (!map.has(dateKey)) {
                map.set(dateKey, []);
            }
            map.get(dateKey)!.push(action);
        });
        return map;
    }, [disciplinaryActions]);

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDayOfWeek = firstDayOfMonth.getDay(); 
    const daysInMonth = lastDayOfMonth.getDate();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const calendarDays = [];
    const MAX_VISIBLE_EVENTS = 2;

    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="border-r border-b bg-slate-50" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateKey = date.toISOString().split('T')[0];
        const dayAbsences = absencesByDate.get(dateKey) || [];
        const dayActions = actionsByDate.get(dateKey) || [];

        const dayEvents: CalendarEvent[] = [
            ...dayAbsences.map(a => ({ ...a, eventType: 'absence' as const })),
            ...dayActions.map(a => ({ ...a, eventType: 'action' as const }))
        ];

        calendarDays.push(
            <div key={day} className="border-r border-b p-2 min-h-[120px] flex flex-col relative">
                <span className="font-semibold text-slate-700">{day}</span>
                 <div className="flex-grow overflow-y-auto mt-1 space-y-1 text-xs">
                    {dayEvents.slice(0, MAX_VISIBLE_EVENTS).map(event => {
                        const employee = employeeMap.get(event.employeeId);
                        if (!employee) return null;

                        if (event.eventType === 'absence') {
                            const colors = absenceColors[event.type];
                            return (
                                <div key={`${event.id}-${dateKey}`} className={`p-1 rounded text-ellipsis overflow-hidden whitespace-nowrap ${colors.bg} ${colors.text}`} title={`${event.type}: ${employee.name}`}>
                                   {colors.emoji} {employee.name}
                                </div>
                            );
                        } else { // 'action'
                            const colors = actionColors[event.type];
                             return (
                                <div key={`${event.id}-${dateKey}`} className={`p-1 rounded text-ellipsis overflow-hidden whitespace-nowrap ${colors.bg} ${colors.text}`} title={`${event.type}: ${employee.name}`}>
                                    {colors.emoji} {employee.name}
                                </div>
                            );
                        }
                    })}
                    {dayEvents.length > MAX_VISIBLE_EVENTS && (
                        <button 
                            onClick={() => setDetailModalData({ date: dateKey, events: dayEvents })}
                            className="mt-1 text-blue-600 font-semibold hover:underline text-left w-full text-xs"
                        >
                            + {dayEvents.length - MAX_VISIBLE_EVENTS} más...
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-slate-800">Calendario de Equipo</h3>
                 <p className="text-sm text-slate-500 mb-4">Vista mensual de las ausencias, alertas y eventos del equipo.</p>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-100"><ArrowLeftCircleIcon /></button>
                    <h4 className="text-lg font-semibold text-slate-800">
                        {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
                    </h4>
                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-100"><ArrowRightCircleIcon /></button>
                </div>
                <div className="grid grid-cols-7 border-t border-l">
                    {weekDays.map(day => (
                        <div key={day} className="text-center font-medium p-2 border-r border-b bg-slate-100 text-slate-600">{day}</div>
                    ))}
                    {calendarDays}
                </div>
            </div>

            {detailModalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={() => setDetailModalData(null)}>
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b">
                            <h4 className="text-lg font-semibold text-slate-800">
                                Eventos para el {new Date(detailModalData.date + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </h4>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <ul className="space-y-3">
                                {detailModalData.events.map(event => {
                                    const employee = employeeMap.get(event.employeeId);
                                    if (!employee) return null;
                                    
                                    if (event.eventType === 'absence') {
                                        const colors = absenceColors[event.type];
                                        return (
                                            <li key={`absence-${event.id}`} className={`flex items-center p-3 rounded-lg ${colors.bg}`}>
                                                <span className="text-2xl mr-4">{colors.emoji}</span>
                                                <div>
                                                    <p className={`font-semibold ${colors.text}`}>{employee.name}</p>
                                                    <p className={`text-sm ${colors.text}`}>{event.type}</p>
                                                </div>
                                            </li>
                                        );
                                    } else { // 'action'
                                        const colors = actionColors[event.type];
                                        return (
                                            <li key={`action-${event.id}`} className={`flex items-start p-3 rounded-lg ${colors.bg}`}>
                                                <span className="text-2xl mr-4">{colors.emoji}</span>
                                                <div>
                                                    <p className={`font-semibold ${colors.text}`}>{employee.name}</p>
                                                    <p className={`text-sm font-medium ${colors.text}`}>{event.type}</p>
                                                    <p className={`text-xs mt-1 ${colors.text}`}>{event.reason}</p>
                                                </div>
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                        <div className="bg-slate-50 px-6 py-4 flex justify-end">
                            <button onClick={() => setDetailModalData(null)} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompanyCalendar;