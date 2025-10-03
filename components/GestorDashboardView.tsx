import React from 'react';
import { type User, type Company, type ViewType } from '../types';
import DocumentCurrencyIcon from './icons/DocumentCurrencyIcon';
import MegaphoneIcon from './icons/MegaphoneIcon';

interface GestorDashboardViewProps {
    user: User;
    company: Company;
    onNavigate: (view: ViewType) => void;
}

const GestorDashboardView: React.FC<GestorDashboardViewProps> = ({ user, company, onNavigate }) => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">
                    Bienvenido, {user.name}
                </h2>
                <p className="text-slate-600 mt-1">
                    Portal de gestión para <span className="font-semibold">{company.name}</span>.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => onNavigate('payrollManagement')}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <DocumentCurrencyIcon />
                         </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800">Gestión de Nóminas</h3>
                            <p className="text-slate-500 mt-1">Subir y gestionar documentos de nómina.</p>
                        </div>
                    </div>
                </button>
                <button
                     onClick={() => onNavigate('regulatoryCompliance')}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
                >
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <MegaphoneIcon />
                         </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800">Comunicaciones</h3>
                             <p className="text-slate-500 mt-1">Publicar comunicados y reglamentaciones.</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default GestorDashboardView;