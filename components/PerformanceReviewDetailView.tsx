import React, { useState, useMemo } from 'react';
import { type PerformanceReview, type Employee, type User, PerformanceReviewStatus } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface PerformanceReviewDetailViewProps {
    review: PerformanceReview;
    employees: Employee[];
    currentUser: User | null;
    onUpdateReview: (updatedReview: PerformanceReview) => void;
    onBack: () => void;
}

const PerformanceReviewDetailView: React.FC<PerformanceReviewDetailViewProps> = ({ review, employees, currentUser, onUpdateReview, onBack }) => {
    const [formData, setFormData] = useState<PerformanceReview>(review);
    
    const employee = useMemo(() => employees.find(e => e.id === review.employeeId), [employees, review.employeeId]);
    const reviewer = useMemo(() => employees.find(e => e.id === review.reviewerId), [employees, review.reviewerId]);
    const currentEmployee = useMemo(() => employees.find(e => e.email === currentUser?.email), [employees, currentUser]);

    const isReviewer = currentEmployee?.id === review.reviewerId || currentUser?.role === 'consultor';
    const isReviewedEmployee = currentEmployee?.id === review.employeeId;

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = () => {
        onUpdateReview(formData);
    };

    const handleCompleteReview = () => {
        onUpdateReview({ ...formData, status: PerformanceReviewStatus.Completed });
    };

    if (!employee || !reviewer) {
        return <div>Error: No se pudieron cargar los datos del empleado o del evaluador.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                    <ArrowLeftIcon />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Detalle de Evaluación</h2>
                    <p className="text-slate-600 mt-1">Evaluación de <span className="font-semibold">{employee.name}</span> para el período {review.periodStartDate} al {review.periodEndDate}.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Manager Feedback Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Feedback del Manager ({reviewer.name})</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Fortalezas</label>
                                <textarea name="strengths" value={formData.strengths} onChange={handleInputChange} readOnly={!isReviewer} rows={3} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm read-only:bg-slate-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Áreas de Mejora</label>
                                <textarea name="areasForImprovement" value={formData.areasForImprovement} onChange={handleInputChange} readOnly={!isReviewer} rows={3} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm read-only:bg-slate-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Feedback General</label>
                                <textarea name="managerFeedback" value={formData.managerFeedback} onChange={handleInputChange} readOnly={!isReviewer} rows={4} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm read-only:bg-slate-100" />
                            </div>
                        </div>
                    </div>

                    {/* Employee Comments Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Comentarios del Empleado ({employee.name})</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Comentarios</label>
                            <textarea name="employeeComments" value={formData.employeeComments} onChange={handleInputChange} readOnly={!isReviewedEmployee} rows={4} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm read-only:bg-slate-100" />
                        </div>
                    </div>
                </div>

                {/* Goals and Actions Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Objetivos</h3>
                        <div className="space-y-3">
                            {formData.goals.map(goal => (
                                <div key={goal.id} className="p-3 bg-slate-50 rounded-md">
                                    <p className="text-sm text-slate-800">{goal.description}</p>
                                    <span className={`mt-1 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                                        goal.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                        goal.status === 'On Track' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {goal.status}
                                    </span>
                                </div>
                            ))}
                             {formData.goals.length === 0 && <p className="text-sm text-center text-slate-500 py-4">No hay objetivos definidos.</p>}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Acciones</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={handleSaveChanges}
                                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Guardar Cambios
                            </button>
                            {isReviewer && (
                                <button
                                    onClick={handleCompleteReview}
                                    disabled={formData.status === PerformanceReviewStatus.Completed}
                                    className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-400"
                                >
                                    Finalizar Evaluación
                                </button>
                            )}
                             <button 
                                onClick={onBack}
                                className="w-full bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
                            >
                                Volver a la Lista
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceReviewDetailView;
