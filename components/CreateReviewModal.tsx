import React, { useState, useEffect } from 'react';
import { type Employee } from '../types';

interface CreateReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (employeeId: number, periodStartDate: string, periodEndDate: string) => void;
    employees: Employee[];
}

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({ isOpen, onClose, onSubmit, employees }) => {
    const today = new Date().toISOString().split('T')[0];
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

    const [employeeId, setEmployeeId] = useState<number | ''>('');
    const [periodStartDate, setPeriodStartDate] = useState(sixMonthsAgoStr);
    const [periodEndDate, setPeriodEndDate] = useState(today);

    useEffect(() => {
        if (isOpen) {
            setEmployeeId(employees[0]?.id || '');
            setPeriodStartDate(sixMonthsAgoStr);
            setPeriodEndDate(today);
        }
    }, [isOpen, employees, sixMonthsAgoStr, today]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (employeeId) {
            onSubmit(Number(employeeId), periodStartDate, periodEndDate);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-slate-800">Iniciar Nueva Evaluación de Desempeño</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="review-employee" className="block text-sm font-medium text-slate-700">Empleado a Evaluar</label>
                            <select
                                id="review-employee"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(Number(e.target.value))}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Seleccione un empleado</option>
                                {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="review-start-date" className="block text-sm font-medium text-slate-700">Inicio del Período</label>
                                <input
                                    id="review-start-date"
                                    type="date"
                                    value={periodStartDate}
                                    onChange={(e) => setPeriodStartDate(e.target.value)}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="review-end-date" className="block text-sm font-medium text-slate-700">Fin del Período</label>
                                <input
                                    id="review-end-date"
                                    type="date"
                                    value={periodEndDate}
                                    min={periodStartDate}
                                    onChange={(e) => setPeriodEndDate(e.target.value)}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Crear Evaluación</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateReviewModal;
