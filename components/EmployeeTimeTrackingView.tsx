import React, { useMemo } from 'react';
import { type Employee, type TimeLog } from '../types';
import TimeTrackingCalendar from './TimeTrackingCalendar';

interface EmployeeTimeTrackingViewProps {
    employee: Employee;
    timeLogs: TimeLog[];
    onClockIn: (employeeId: number) => void;
    onClockOut: (employeeId: number) => void;
}

const EmployeeTimeTrackingView: React.FC<EmployeeTimeTrackingViewProps> = ({ employee, timeLogs, onClockIn, onClockOut }) => {
    const lastLog = useMemo(() => {
        return [...timeLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
    }, [timeLogs]);
    
    const isClockedIn = lastLog?.type === 'in';

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Control Horario</h2>
                <p className="text-slate-600 mt-1">Registre su hora de entrada y salida.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">Estado Actual</h3>
                        <p className={`text-2xl font-bold ${isClockedIn ? 'text-green-600' : 'text-slate-500'}`}>
                            {isClockedIn ? 'Dentro de la oficina' : 'Fuera de la oficina'}
                        </p>
                        {lastLog && (
                            <p className="text-sm text-slate-500 mt-1">
                                Último registro: {new Date(lastLog.timestamp).toLocaleString()}
                            </p>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="space-y-4">
                            <button
                                onClick={() => onClockIn(employee.id)}
                                disabled={isClockedIn}
                                className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                            >
                                Fichar Entrada
                            </button>
                            <button
                                onClick={() => onClockOut(employee.id)}
                                disabled={!isClockedIn}
                                className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                            >
                                Fichar Salida
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                     <h3 className="text-xl font-semibold text-slate-800 mb-4">Mi Historial de Fichajes</h3>
                     <TimeTrackingCalendar timeLogs={timeLogs} />
                </div>
            </div>
        </div>
    );
};

export default EmployeeTimeTrackingView;