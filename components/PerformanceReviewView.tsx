import React from 'react';
import { type PerformanceReview, type Employee, PerformanceReviewStatus, type User } from '../types';

interface PerformanceReviewViewProps {
    reviews: PerformanceReview[];
    employees: Employee[];
    onStartReview: () => void;
    onSelectReview: (review: PerformanceReview) => void;
    currentUser: User | null;
}

const statusStyles: Record<PerformanceReviewStatus, { bg: string; text: string; }> = {
    [PerformanceReviewStatus.Pending]: { bg: 'bg-slate-100', text: 'text-slate-800' },
    [PerformanceReviewStatus.InProgress]: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    [PerformanceReviewStatus.Completed]: { bg: 'bg-green-100', text: 'text-green-800' },
};

const PerformanceReviewView: React.FC<PerformanceReviewViewProps> = ({ reviews, employees, onStartReview, onSelectReview, currentUser }) => {
    // FIX: Explicitly type the Map to prevent type inference issues.
    const employeeMap = new Map<number, Employee>(employees.map(e => [e.id, e]));
    const canStartReview = currentUser?.role === 'empresa' || currentUser?.role === 'consultor';

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Evaluaciones de Desempeño</h2>
                    <p className="text-gray-600 mt-1">Gestione y realice el seguimiento de las evaluaciones de desempeño del equipo.</p>
                </div>
                {canStartReview && (
                    <button
                        onClick={onStartReview}
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex-shrink-0"
                    >
                        Iniciar Nueva Evaluación
                    </button>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-3 font-semibold text-slate-600">Empleado</th>
                                <th className="p-3 font-semibold text-slate-600">Período de Evaluación</th>
                                <th className="p-3 font-semibold text-slate-600">Fecha de Revisión</th>
                                <th className="p-3 font-semibold text-slate-600">Estado</th>
                                <th className="p-3 font-semibold text-slate-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.length > 0 ? reviews.map(review => (
                                <tr key={review.id} className="border-b hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-800">{employeeMap.get(review.employeeId)?.name || 'N/A'}</td>
                                    <td className="p-3 text-slate-600">{review.periodStartDate} al {review.periodEndDate}</td>
                                    <td className="p-3 text-slate-600">{new Date(review.reviewDate).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[review.status].bg} ${statusStyles[review.status].text}`}>
                                            {review.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button onClick={() => onSelectReview(review)} className="text-blue-600 hover:underline font-semibold text-sm">Ver/Editar</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-12">
                                        <p className="text-slate-500">No hay evaluaciones de desempeño creadas.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PerformanceReviewView;
