import React, { useState } from 'react';
import CalendarDaysIcon from './icons/CalendarDaysIcon';

interface GenerateReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (startDate: string, endDate: string) => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose, onGenerate }) => {
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(startDate, endDate);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                        <CalendarDaysIcon />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-slate-800">Generar Informe de Asistencia</h3>
                        <p className="text-sm text-slate-500">Seleccione el período para el informe.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
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
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Generar y Descargar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenerateReportModal;
