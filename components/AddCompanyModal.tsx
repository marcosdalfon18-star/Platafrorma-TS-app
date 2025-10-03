import React, { useState, useEffect } from 'react';
import { type Company, type Plan, type UserPlan } from '../types';

interface AddCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCompany: (company: Omit<Company, 'id'>) => void;
    plans: Plan[];
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ isOpen, onClose, onAddCompany, plans }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [planId, setPlanId] = useState<UserPlan>(plans[0]?.id || 'plan_basico');
    // FIX: Add state for industry
    const [industry, setIndustry] = useState('');

    useEffect(() => {
        // This effect runs when the `isOpen` prop changes.
        // If the modal is opening, we reset the form fields to their default values.
        if (isOpen) {
            setName('');
            setAddress('');
            setContact('');
            // FIX: Reset industry state
            setIndustry('');
            setPlanId(plans[0]?.id || 'plan_basico');
        }
    }, [isOpen, plans]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // FIX: Provide all required properties for the Company type to satisfy Omit<Company, 'id'>.
        onAddCompany({
            name,
            address,
            contact,
            planId,
            industry,
            imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
            logoUrl: `https://i.pravatar.cc/100?u=${encodeURIComponent(name)}`
        });
        // After submission, the parent component will close the modal.
        // The useEffect hook above will handle resetting the form the next time it opens.
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-slate-800">Registrar Nueva Empresa</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="company-name" className="block text-sm font-medium text-slate-700">Nombre de la Empresa</label>
                            <input
                                id="company-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="company-address" className="block text-sm font-medium text-slate-700">Dirección</label>
                            <input
                                id="company-address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="company-contact" className="block text-sm font-medium text-slate-700">Email de Contacto</label>
                            <input
                                id="company-contact"
                                type="email"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        {/* FIX: Add input for industry */}
                        <div>
                            <label htmlFor="company-industry" className="block text-sm font-medium text-slate-700">Industria</label>
                            <input
                                id="company-industry"
                                type="text"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="company-plan" className="block text-sm font-medium text-slate-700">Plan Asociado</label>
                            <select
                                id="company-plan"
                                value={planId}
                                onChange={(e) => setPlanId(e.target.value as UserPlan)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                {plans.map(plan => (
                                    <option key={plan.id} value={plan.id}>{plan.name}</option>
                                ))}
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
                            Guardar Empresa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCompanyModal;