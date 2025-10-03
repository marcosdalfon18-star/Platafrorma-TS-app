import React, { useState } from 'react';
import { type AdvisoryLogEntry, type InteractionType } from '../types';
import PhoneIcon from './icons/PhoneIcon';
import UsersGroupIcon from './icons/UsersGroupIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';

interface AdvisoryLogWidgetProps {
    companyId: number;
    logs: AdvisoryLogEntry[];
    onAddLog: (log: Omit<AdvisoryLogEntry, 'id' | 'date' | 'consultantName'>) => void;
}

const INTERACTION_TYPES: InteractionType[] = ['Reunión', 'Llamada', 'Email', 'Otro'];

// FIX: Replaced JSX.Element with React.ReactNode to resolve namespace error.
const interactionIcons: Record<InteractionType, React.ReactNode> = {
    'Reunión': <UsersGroupIcon />,
    'Llamada': <PhoneIcon />,
    'Email': <EnvelopeIcon />,
    'Otro': <DocumentTextIcon />,
};

const AdvisoryLogWidget: React.FC<AdvisoryLogWidgetProps> = ({ companyId, logs, onAddLog }) => {
    const [interactionType, setInteractionType] = useState<InteractionType>('Reunión');
    const [notes, setNotes] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (notes.trim()) {
            onAddLog({ companyId, interactionType, notes });
            setNotes('');
            setInteractionType('Reunión');
            setShowForm(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-slate-800">Bitácora de Asesoramiento</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                    {showForm ? 'Cancelar' : 'Añadir Entrada'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 bg-slate-50 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="interactionType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de Interacción</label>
                            <select
                                id="interactionType"
                                value={interactionType}
                                onChange={(e) => setInteractionType(e.target.value as InteractionType)}
                                className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                {INTERACTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">Notas</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Describa la interacción y los puntos clave..."
                                required
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Guardar Entrada
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {logs.length > 0 ? logs.map(log => (
                    <div key={log.id} className="flex items-start gap-4 p-3 rounded-lg bg-blue-50/50">
                        <div className="text-blue-600 mt-1">{interactionIcons[log.interactionType]}</div>
                        <div>
                            <p className="font-semibold text-slate-800">{log.interactionType} - <span className="font-normal text-slate-500 text-sm">{new Date(log.date).toLocaleString()}</span></p>
                            <p className="text-slate-700 text-sm mt-1">{log.notes}</p>
                            <p className="text-xs text-slate-400 mt-2">Registrado por: {log.consultantName}</p>
                        </div>
                    </div>
                )) : (
                    <p className="text-center text-slate-500 py-8">No hay entradas en la bitácora todavía.</p>
                )}
            </div>
        </div>
    );
};

export default AdvisoryLogWidget;
