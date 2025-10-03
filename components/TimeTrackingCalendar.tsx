import React, { useState, useMemo } from 'react';
import { type TimeLog } from '../types';
import ArrowLeftCircleIcon from './icons/ArrowLeftCircleIcon';
import ArrowRightCircleIcon from './icons/ArrowRightCircleIcon';

interface TimeTrackingCalendarProps {
    timeLogs: TimeLog[];
    showEmployeeName?: boolean;
    employeeNameMap?: Map<number, string>;
}

const TimeTrackingCalendar: React.FC<TimeTrackingCalendarProps> = ({ timeLogs, showEmployeeName = false, employeeNameMap }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysInMonth = lastDayOfMonth.getDate();

    const logsByDate = useMemo(() => {
        const map = new Map<string, TimeLog[]>();
        timeLogs.forEach(log => {
            const dateKey = new Date(log.timestamp).toISOString().split('T')[0];
            if (!map.has(dateKey)) {
                map.set(dateKey, []);
            }
            map.get(dateKey)!.push(log);
        });
        return map;
    }, [timeLogs]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const calendarDays = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="border-r border-b" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateKey = date.toISOString().split('T')[0];
        const dayLogs = logsByDate.get(dateKey) || [];

        calendarDays.push(
            <div key={day} className="border-r border-b p-2 min-h-[120px] flex flex-col">
                <span className="font-semibold text-slate-700">{day}</span>
                <div className="flex-grow overflow-y-auto mt-1 space-y-1 text-xs">
                    {dayLogs.map(log => (
                        <div key={log.id} className={`p-1 rounded ${log.type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                           {showEmployeeName && <p className="font-bold">{employeeNameMap?.get(log.employeeId) || 'N/A'}</p>}
                           <span>{log.type === 'in' ? 'Entrada' : 'Salida'}: {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-100"><ArrowLeftCircleIcon /></button>
                <h3 className="text-lg font-semibold text-slate-800">
                    {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
                </h3>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-100"><ArrowRightCircleIcon /></button>
            </div>
            <div className="grid grid-cols-7 border-t border-l">
                {weekDays.map(day => (
                    <div key={day} className="text-center font-medium p-2 border-r border-b bg-slate-50 text-slate-600">{day}</div>
                ))}
                {calendarDays}
            </div>
        </div>
    );
};

export default TimeTrackingCalendar;