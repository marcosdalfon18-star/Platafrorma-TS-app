import React, { useState, useEffect } from 'react';
import { type AbsenceRequest, AbsenceType } from '../types';

interface RequestAbsenceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (request: Omit<AbsenceRequest, 'id' | 'status'>) => void;
    employeeId: number;
}

const RequestAbsenceModal: React.FC<RequestAbsenceModalProps> = ({ isOpen, onClose, onSubmit, employeeId }) => {
    const today = new Date().toISOString().split('T')[0];
    const [type, setType] = useState<AbsenceType>(AbsenceType.Vacation);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (isOpen) {
            const todayStr = new Date().toISOString().split('T')[0];
            setType(AbsenceType.Vacation);
            setStartDate(todayStr);
            setEndDate(todayStr);
            setReason('');
        }
    }, [isOpen]);
    
    useEffect(() => {
        if (new Date(endDate) < new Date(startDate)) {
            setEndDate(startDate);
        }
    }, [startDate, endDate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (employeeId) {
            onSubmit({ employeeId, type, startDate, endDate, reason });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-slate-800">Solicitar Ausencia</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="absence-type" className="block text-sm font-medium text-slate-700">Tipo de Ausencia</label>
                            <select
                                id="absence-type"
                                value={type}
                                onChange={(e) => setType(e.target.value as AbsenceType)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                {Object.values(AbsenceType).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="start-date" className="block text-sm font-medium text-slate-700">Fecha de Inicio</label>
                                <input
                                    id="start-date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="end-date" className="block text-sm font-medium text-slate-700">Fecha de Fin</label>
                                <input
                                    id="end-date"
                                    type="date"
                                    value={endDate}
                                    min={startDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                             <label htmlFor="absence-reason" className="block text-sm font-medium text-slate-700">Motivo (opcional)</label>
                             <textarea
                                id="absence-reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={3}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Añada un breve comentario si es necesario..."
                             />
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Enviar Solicitud</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestAbsenceModal;