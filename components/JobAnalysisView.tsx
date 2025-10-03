import React from 'react';
import { type UserPlan, type Employee, type JobPosition } from '../types';
import OrgChartView from './OrgChartView';
import DocumentTextIcon from './icons/DocumentTextIcon';


interface JobAnalysisViewProps {
    userPlan: UserPlan;
    employees: Employee[];
    jobPositions: JobPosition[];
    onAddPosition: () => void;
}

const JobAnalysisView: React.FC<JobAnalysisViewProps> = ({ userPlan, employees, jobPositions, onAddPosition }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Análisis y Descripción de Puestos</h2>
            <p className="text-gray-600">
            Defina nuevos roles, gestione los puestos existentes y visualice la estructura de la empresa.
            </p>
        </div>
         <button
            onClick={onAddPosition}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex-shrink-0"
        >
            Añadir Nuevo Puesto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="text-xl font-semibold text-slate-800 mb-4">Puestos Definidos</h3>
                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                     {jobPositions.length > 0 ? jobPositions.map(pos => (
                         <div key={pos.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                             <p className="font-semibold text-slate-800">{pos.title}</p>
                             <p className="text-sm text-slate-600 mt-1">{pos.description}</p>
                         </div>
                     )) : (
                         <div className="text-center py-10">
                            <p className="text-slate-500">No hay puestos de trabajo definidos.</p>
                         </div>
                     )}
                 </div>
            </div>
        </div>
        <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <DocumentTextIcon />
                    Gestión de Roles
                </h3>
                <p className="text-sm text-slate-600">
                    Crear una estructura de puestos clara es fundamental para la gestión del talento.
                    Desde aquí, puede definir cada rol en la organización, que luego se utilizará para:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-3 space-y-1">
                    <li>Asignar empleados a sus roles correctos.</li>
                    <li>Iniciar procesos de selección de talento.</li>
                    <li>Generar descripciones de puesto con IA.</li>
                </ul>
            </div>
        </div>
      </div>
      
      {/* Re-utilizamos el organigrama como la interfaz principal para esta vista */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 p-4">Organigrama Visual</h3>
        <OrgChartView employees={employees} userPlan={userPlan} />
      </div>
    </div>
  );
};

export default JobAnalysisView;