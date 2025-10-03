

import React, { useMemo } from 'react';
import { type Employee, type TimeLog, type Activity } from '../types';
import TimeTrackingCalendar from './TimeTrackingCalendar';
import { ActivityFeedWidget } from './DashboardView';
import DocumentChartBarIcon from './icons/DocumentChartBarIcon';

interface CompanyTimeTrackingViewProps {
    employees: Employee[];
    timeLogs: TimeLog[];
    activities: Activity[];
    onGenerateReport: () => void;
    selectedEmployeeId: number | 'all';
    setSelectedEmployeeId: (id: number | 'all') => void;
}

const CompanyTimeTrackingView: React.FC<CompanyTimeTrackingViewProps> = ({ employees, timeLogs, activities, onGenerateReport, selectedEmployeeId, setSelectedEmployeeId }) => {

    const filteredLogs = useMemo(() => {
        if (selectedEmployeeId === 'all') {
            return timeLogs;
        }
        return timeLogs.filter(log => log.employeeId === selectedEmployeeId);
    }, [timeLogs, selectedEmployeeId]);
    
    const employeeNameMap = useMemo(() => {
        const map = new Map<number, string>();
        employees.forEach(e => map.set(e.id, e.name));
        return map;
    }, [employees]);


    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Control Horario de Empleados</h2>
                <p className="text-slate-600 mt-1">Supervise los registros de entrada y salida de su equipo.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                 <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h3 className="text-xl font-semibold text-slate-800">Calendario de Fichajes</h3>
                        <div className="flex items-end gap-4">
                            <div>
                                <label htmlFor="employee-filter" className="block text-sm font-medium text-slate-700 mb-1">Filtrar por Empleado</label>
                                <select
                                    id="employee-filter"
                                    value={selectedEmployeeId}
                                    onChange={(e) => setSelectedEmployeeId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                                    className="w-full sm:w-auto border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="all">Todos los empleados</option>
                                    {employees.map(e => (
                                        <option key={e.id} value={e.id}>{e.name}</option>
                                    ))}
                                </select>
                            </div>
                             <button
                                onClick={onGenerateReport}
                                className="flex items-center gap-2 bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors text-sm"
                            >
                                <DocumentChartBarIcon />
                                Generar Informe
                            </button>
                        </div>
                    </div>
                    
                    <TimeTrackingCalendar 
                        timeLogs={filteredLogs} 
                        showEmployeeName={selectedEmployeeId === 'all'}
                        employeeNameMap={employeeNameMap}
                    />
                </div>
                <div className="lg:col-span-1 h-full">
                     <ActivityFeedWidget activities={activities} title="Actividad Reciente de Fichajes" />
                </div>
            </div>
        </div>
    );
};

export default CompanyTimeTrackingView;
