
import React from 'react';
import { type Company, type Employee, type AdvisoryLogEntry, type Document, EmployeeStatus, type InteractionType } from '../types';
import AdvisoryLogWidget from './AdvisoryLogWidget';
import DocumentListWidget from './DocumentListWidget';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface ConsultantCompanyDetailViewProps {
    company: Company;
    employees: Employee[];
    advisoryLogs: AdvisoryLogEntry[];
    documents: Document[];
    onAddAdvisoryLog: (log: Omit<AdvisoryLogEntry, 'id' | 'date' | 'consultantName'>) => void;
    onBack: () => void;
    onUploadDocument: () => void;
}

const KpiCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <p className="text-slate-500">{title}</p>
        <p className="text-4xl font-bold text-slate-800">{value}</p>
    </div>
);

const ConsultantCompanyDetailView: React.FC<ConsultantCompanyDetailViewProps> = ({ company, employees, advisoryLogs, documents, onAddAdvisoryLog, onBack, onUploadDocument }) => {
    const activeEmployees = employees.filter(e => e.status === EmployeeStatus.Active).length;
    const onVacationEmployees = employees.filter(e => e.status === EmployeeStatus.Vacation).length;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                    <ArrowLeftIcon />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">{company.name}</h2>
                    <p className="text-gray-600 mt-1">Gestión detallada del cliente.</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Left Column (Main content) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <KpiCard title="Empleados Totales" value={employees.length} />
                        <KpiCard title="Activos" value={activeEmployees} />
                        <KpiCard title="En Vacaciones" value={onVacationEmployees} />
                    </div>
                    
                    <AdvisoryLogWidget
                        companyId={company.id}
                        logs={advisoryLogs}
                        onAddLog={onAddAdvisoryLog}
                    />
                </div>
                
                {/* Right Column (Sidebar content) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Información de Contacto</h3>
                        <div className="space-y-2 text-slate-700">
                            <p><strong>Email:</strong> {company.contact}</p>
                            <p><strong>Dirección:</strong> {company.address}</p>
                            <p><strong>Plan:</strong> <span className="font-semibold capitalize">{company.planId.replace('plan_', '')}</span></p>
                        </div>
                    </div>
                    <DocumentListWidget documents={documents} onUploadClick={onUploadDocument} />
                </div>
            </div>
        </div>
    );
};

export default ConsultantCompanyDetailView;