import React, { useState } from 'react';
import { type Employee, EmployeeStatus, type JobPosition } from '../types';

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddEmployee: (data: { name: string, email: string, positionId: string, status: EmployeeStatus }) => void;
    jobPositions: JobPosition[];
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAddEmployee, jobPositions }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [positionId, setPositionId] = useState(jobPositions[0]?.id || '');
    const [status, setStatus] = useState<EmployeeStatus>(EmployeeStatus.Active);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && email.trim() && positionId) {
            onAddEmployee({ name, email, positionId, status });
            // Reset form for next time
            setName('');
            setEmail('');
            setPositionId(jobPositions[0]?.id || '');
            setStatus(EmployeeStatus.Active);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-slate-800">Añadir Nuevo Empleado</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="employee-name" className="block text-sm font-medium text-slate-700">Nombre Completo</label>
                            <input
                                id="employee-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-email" className="block text-sm font-medium text-slate-700">Email de Acceso</label>
                            <input
                                id="employee-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="usuario@empresa.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-position" className="block text-sm font-medium text-slate-700">Puesto</label>
                            <select
                                id="employee-position"
                                value={positionId}
                                onChange={(e) => setPositionId(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Seleccione un puesto</option>
                                {jobPositions.map(pos => <option key={pos.id} value={pos.id}>{pos.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="employee-status" className="block text-sm font-medium text-slate-700">Estado Inicial</label>
                            <select
                                id="employee-status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as EmployeeStatus)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                {Object.values(EmployeeStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Añadir Empleado
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;