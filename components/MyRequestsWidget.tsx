import React from 'react';
import { type AbsenceRequest, AbsenceRequestStatus } from '../types';
import ClipboardDocumentListIcon from './icons/ClipboardDocumentListIcon';

interface MyRequestsWidgetProps {
    requests: AbsenceRequest[];
}

const statusStyles: Record<AbsenceRequestStatus, { bg: string; text: string; }> = {
    [AbsenceRequestStatus.Pending]: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    [AbsenceRequestStatus.Approved]: { bg: 'bg-green-100', text: 'text-green-800' },
    [AbsenceRequestStatus.Rejected]: { bg: 'bg-red-100', text: 'text-red-800' },
};

const MyRequestsWidget: React.FC<MyRequestsWidgetProps> = ({ requests }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <ClipboardDocumentListIcon />
                <h3 className="text-xl font-semibold text-slate-800">Mis Solicitudes de Ausencia</h3>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {requests.length > 0 ? (
                    requests
                        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                        .map(req => (
                            <div key={req.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-slate-800">{req.type}</p>
                                        <p className="text-sm text-slate-600">
                                            {new Date(req.startDate + 'T00:00:00').toLocaleDateString()} - {new Date(req.endDate + 'T00:00:00').toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[req.status].bg} ${statusStyles[req.status].text}`}>
                                        {req.status}
                                    </span>
                                </div>
                                {req.reason && <p className="text-xs text-slate-500 mt-2 italic">Motivo: "{req.reason}"</p>}
                            </div>
                        ))
                ) : (
                    <p className="text-center text-slate-500 py-8">No tiene solicitudes de ausencia.</p>
                )}
            </div>
        </div>
    );
};

export default MyRequestsWidget;