import React, { useState, useEffect } from 'react';
import { type Plan, type UserPlan } from '../types';

interface AddEditPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (planData: Omit<Plan, 'id'>, id?: UserPlan) => void;
    plan: Plan | null;
}

const AddEditPlanModal: React.FC<AddEditPlanModalProps> = ({ isOpen, onClose, onSave, plan }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [features, setFeatures] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (plan) {
                setName(plan.name);
                setDescription(plan.description);
                setPrice(plan.price);
                setFeatures(plan.features.join('\n'));
            } else {
                setName('');
                setDescription('');
                setPrice(0);
                setFeatures('');
            }
        }
    }, [isOpen, plan]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const featuresArray = features.split('\n').map(f => f.trim()).filter(Boolean);
        onSave({ name, description, price, features: featuresArray }, plan?.id);
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
                    <h3 className="text-xl font-semibold text-slate-800">{plan ? 'Editar Plan' : 'Añadir Nuevo Plan'}</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="plan-name" className="block text-sm font-medium text-slate-700">Nombre del Plan</label>
                            <input
                                id="plan-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="plan-description" className="block text-sm font-medium text-slate-700">Descripción</label>
                            <textarea
                                id="plan-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                         <div>
                            <label htmlFor="plan-features" className="block text-sm font-medium text-slate-700">Características (una por línea)</label>
                            <textarea
                                id="plan-features"
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                                rows={5}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="plan-price" className="block text-sm font-medium text-slate-700">Precio (mensual)</label>
                            <input
                                id="plan-price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Guardar Plan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditPlanModal;