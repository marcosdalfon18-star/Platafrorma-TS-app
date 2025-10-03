import React, { useState, useEffect } from 'react';
import { type JobPosition } from '../types';

interface AddJobPositionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPosition: (position: Omit<JobPosition, 'id' | 'companyId'>) => void;
}

const AddJobPositionModal: React.FC<AddJobPositionModalProps> = ({ isOpen, onClose, onAddPosition }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [responsibilities, setResponsibilities] = useState('');

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setDescription('');
            setResponsibilities('');
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const responsibilitiesArray = responsibilities
            .split('\n')
            .map(r => r.trim())
            .filter(r => r.length > 0);
        
        if (title.trim() && description.trim() && responsibilitiesArray.length > 0) {
            onAddPosition({ title, description, responsibilities: responsibilitiesArray });
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-slate-800">Añadir Nuevo Puesto de Trabajo</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="position-title" className="block text-sm font-medium text-slate-700">Título del Puesto</label>
                            <input
                                id="position-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Ej: Desarrollador Frontend"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="position-description" className="block text-sm font-medium text-slate-700">Descripción General</label>
                            <textarea
                                id="position-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Un resumen del propósito y rol del puesto."
                                required
                            />
                        </div>
                         <div>
                            <label htmlFor="position-responsibilities" className="block text-sm font-medium text-slate-700">Responsabilidades Clave</label>
                            <textarea
                                id="position-responsibilities"
                                value={responsibilities}
                                onChange={(e) => setResponsibilities(e.target.value)}
                                rows={5}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Escriba una responsabilidad por línea..."
                                required
                            />
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
                            Guardar Puesto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJobPositionModal;