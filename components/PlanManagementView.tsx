import React from 'react';
import { type Plan } from '../types';

interface PlanManagementViewProps {
    plans: Plan[];
    onEditPlan: (plan: Plan) => void;
    onAddPlan: () => void;
}

const PlanCard: React.FC<{ plan: Plan; onEdit: () => void; }> = ({ plan, onEdit }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow flex flex-col h-full">
        <div className="flex-grow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                    <p className="text-2xl font-semibold text-blue-600 mt-1">${plan.price.toFixed(2)}<span className="text-sm font-normal text-slate-500">/mes</span></p>
                </div>
                <button
                    onClick={onEdit}
                    className="text-sm bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors"
                >
                    Editar
                </button>
            </div>
            <p className="text-slate-600 mt-4 mb-4 text-sm">{plan.description}</p>
            <ul className="space-y-2 text-sm text-slate-700">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);


const PlanManagementView: React.FC<PlanManagementViewProps> = ({ plans, onEditPlan, onAddPlan }) => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Gestión de Planes de Servicio</h2>
                    <p className="text-gray-600 mt-1">Cree, vea y edite los planes ofrecidos a sus clientes.</p>
                </div>
                <button
                    onClick={onAddPlan}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex-shrink-0"
                >
                    Añadir Nuevo Plan
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <PlanCard key={plan.id} plan={plan} onEdit={() => onEditPlan(plan)} />
                ))}
            </div>
        </div>
    );
};

export default PlanManagementView;