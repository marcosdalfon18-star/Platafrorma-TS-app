import React, { useState, useEffect } from 'react';
import { type Employee, EmployeeStatus, type JobPosition } from '../types';

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateEmployee: (employee: Employee) => void;
    employee: Employee | null;
    jobPositions: JobPosition[];
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, onUpdateEmployee, employee, jobPositions }) => {
    const [name, setName] = useState('');
    const [positionId, setPositionId] = useState('');
    const [status, setStatus] = useState<EmployeeStatus>(EmployeeStatus.Active);

    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setPositionId(employee.positionId);
            setStatus(employee.status);
        }
    }, [employee]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (employee && name.trim() && positionId) {
            onUpdateEmployee({
                ...employee,
                name,
                positionId,
                status,
            });
        }
    };

    if (!isOpen || !employee) return null;

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
                    <h3 className="text-xl font-semibold text-slate-800">Editar Información del Empleado</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="edit-employee-name" className="block text-sm font-medium text-slate-700">Nombre Completo</label>
                            <input
                                id="edit-employee-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="edit-employee-position" className="block text-sm font-medium text-slate-700">Puesto</label>
                            <select
                                id="edit-employee-position"
                                value={positionId}
                                onChange={(e) => setPositionId(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                {jobPositions.map(pos => <option key={pos.id} value={pos.id}>{pos.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="edit-employee-status" className="block text-sm font-medium text-slate-700">Estado</label>
                            <select
                                id="edit-employee-status"
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
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployeeModal;
