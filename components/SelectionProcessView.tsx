import React from 'react';
import { type JobOpening, CandidateStatus, type JobPosition } from '../types';

interface SelectionProcessViewProps {
    processes: JobOpening[];
    jobPositions: JobPosition[];
    onRequestSelection: (jobPosition: JobPosition) => void;
}

const statusColors: Record<CandidateStatus, string> = {
    [CandidateStatus.Applied]: 'bg-blue-100 text-blue-800',
    [CandidateStatus.Interviewing]: 'bg-yellow-100 text-yellow-800',
    [CandidateStatus.Offer]: 'bg-purple-100 text-purple-800',
    [CandidateStatus.Hired]: 'bg-green-100 text-green-800',
    [CandidateStatus.Rejected]: 'bg-red-100 text-red-800',
};

const SelectionProcessView: React.FC<SelectionProcessViewProps> = ({ processes, jobPositions, onRequestSelection }) => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Procesos de Selección</h2>
                <p className="text-gray-600 mt-1">Inicie nuevas búsquedas de talento y gestione sus vacantes y candidatos.</p>
            </div>

            {/* Start New Process */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="text-xl font-semibold text-slate-800 mb-4">Iniciar Nuevo Proceso</h3>
                 <p className="text-slate-600 mb-4 text-sm">Seleccione un puesto de trabajo definido para su empresa y solicite a la consultora que inicie el proceso de búsqueda y selección.</p>
                 <div className="space-y-3 max-h-72 overflow-y-auto pr-2 border-t pt-4">
                     {jobPositions.length > 0 ? jobPositions.map(pos => (
                         <div key={pos.id} className="flex items-center justify-between p-3 rounded-md bg-slate-50 flex-wrap gap-2">
                             <div>
                                 <p className="font-medium text-slate-800">{pos.title}</p>
                                 <p className="text-sm text-slate-500">{pos.description}</p>
                             </div>
                             <button
                                onClick={() => onRequestSelection(pos)}
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                             >
                                 Solicitar Búsqueda
                             </button>
                         </div>
                     )) : (
                         <p className="text-center text-slate-500 py-8">No hay puestos de trabajo definidos. Puede crearlos desde el panel principal.</p>
                     )}
                 </div>
            </div>

            {/* Active Processes */}
            <div className="space-y-6">
                 <h3 className="text-xl font-semibold text-slate-800">Procesos Activos</h3>
                {processes.length > 0 ? processes.map(process => (
                    <div key={process.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                            <h4 className="text-lg font-semibold text-slate-800">{process.title}</h4>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${process.status === 'Abierto' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                                {process.status}
                            </span>
                        </div>
                        <div>
                            <h5 className="text-md font-semibold text-slate-700 mb-3 border-t pt-3">Candidatos ({process.candidates.length})</h5>
                            <div className="space-y-3">
                                {process.candidates.map(candidate => (
                                    <div key={candidate.id} className="flex items-center justify-between p-3 rounded-md bg-slate-50 flex-wrap gap-2">
                                        <div>
                                            <p className="font-medium text-slate-800">{candidate.name}</p>
                                            <p className="text-sm text-slate-500">{candidate.email}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[candidate.status]}`}>{candidate.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm border-2 border-dashed">
                        <p className="text-gray-500">No hay procesos de selección activos.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectionProcessView;