import React from 'react';
import { type Company, type Plan } from '../types';

interface CompanyInfoSidebarProps {
    company: Company;
    plans: Plan[];
}

const CompanyInfoSidebar: React.FC<CompanyInfoSidebarProps> = ({ company, plans }) => {
    const planDetails = plans.find(p => p.id === company.planId);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Company Info Section */}
            <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Información de la Empresa</h3>
                <div className="space-y-3 text-slate-700">
                    <div>
                        <p className="text-sm text-slate-500">Email de Contacto</p>
                        <p className="font-medium">{company.contact}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Dirección</p>
                        <p className="font-medium">{company.address}</p>
                    </div>
                </div>
            </div>

            {/* Plan Details Section */}
            {planDetails && (
                <div className="pt-4">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Detalles del Plan</h3>
                     <div className="space-y-3 text-slate-700">
                        <div>
                            <p className="text-sm text-slate-500">Plan Actual</p>
                            <p className="font-bold text-2xl text-blue-700">{planDetails.name}</p>
                        </div>
                        <div>
                             <p className="text-sm text-slate-500">Descripción</p>
                            <p className="font-medium">{planDetails.description}</p>
                        </div>
                         <div>
                             <p className="text-sm text-slate-500">Precio Mensual</p>
                            <p className="font-medium">${planDetails.price.toFixed(2)}</p>
                        </div>
                    </div>
                     {planDetails.features && planDetails.features.length > 0 && (
                        <div className="pt-4 mt-4 border-t">
                            <p className="text-sm text-slate-500 font-semibold mb-2">Características Incluidas</p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                {planDetails.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompanyInfoSidebar;