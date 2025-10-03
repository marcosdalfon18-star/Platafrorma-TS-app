import React from 'react';
import { type AbsenceRequest, AbsenceRequestStatus, type Employee } from '../types';
import ClipboardDocumentCheckIcon from './icons/ClipboardDocumentCheckIcon';

interface PendingRequestsWidgetProps {
    requests: AbsenceRequest[];
    onReviewRequest: (requestId: number, newStatus: AbsenceRequestStatus.Approved | AbsenceRequestStatus.Rejected) => void;
    employeeMap: Map<number, Employee>;
}

const PendingRequestsWidget: React.FC<PendingRequestsWidgetProps> = ({ requests, onReviewRequest, employeeMap }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <ClipboardDocumentCheckIcon />
                <h3 className="text-xl font-semibold text-slate-800">Solicitudes de Ausencia Pendientes</h3>
            </div>
            <div className="space-y-4">
                {requests.length > 0 ? (
                    requests.map(req => {
                        const employee = employeeMap.get(req.employeeId);
                        return (
                            <div key={req.id} className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                                    <div>
                                        <p className="font-semibold text-slate-800">{employee?.name || 'Empleado desconocido'}</p>
                                        <p className="text-sm text-slate-600 font-medium">{req.type}</p>
                                        <p className="text-sm text-slate-600">
                                            {new Date(req.startDate + 'T00:00:00').toLocaleDateString()} - {new Date(req.endDate + 'T00:00:00').toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 mt-3 sm:mt-0 flex-shrink-0">
                                        <button 
                                            onClick={() => onReviewRequest(req.id, AbsenceRequestStatus.Rejected)}
                                            className="px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                                        >
                                            Rechazar
                                        </button>
                                        <button 
                                            onClick={() => onReviewRequest(req.id, AbsenceRequestStatus.Approved)}
                                            className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                                        >
                                            Aprobar
                                        </button>
                                    </div>
                                </div>
                                {req.reason && <p className="text-xs text-slate-500 mt-2 italic">Motivo: "{req.reason}"</p>}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-slate-500 py-8">No hay solicitudes pendientes.</p>
                )}
            </div>
        </div>
    );
};

export default PendingRequestsWidget;