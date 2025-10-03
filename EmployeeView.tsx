import React, { useState } from 'react';
import { type User, type Company, type Employee, type Document, type DocumentCategory, type AbsenceRequest } from '../types';
import DocumentTextIcon from './icons/DocumentTextIcon';
import UploadIcon from './icons/UploadIcon';
import PencilIcon from './icons/PencilIcon';
import { JOB_POSITIONS } from '../constants';
import MyRequestsWidget from './MyRequestsWidget';

interface EmployeeViewProps {
    user: User;
    employee: Employee;
    company: Company;
    documents: Document[];
    absenceRequests: AbsenceRequest[];
    onRequestAbsence: () => void;
}

const EmployeeView: React.FC<EmployeeViewProps> = ({ user, employee, company, documents, absenceRequests, onRequestAbsence }) => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [name, setName] = useState(employee.name);
    
    // State for new document
    const [newDocTitle, setNewDocTitle] = useState('');
    const [newDocCategory, setNewDocCategory] = useState<DocumentCategory>('Personal');

    const position = JOB_POSITIONS.find(p => p.id === employee.positionId);

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // onUpdateProfile({ ...employee, name }); // This needs to be passed down if we want to persist it
        setIsEditingProfile(false);
    };

    const handleAddDocument = (e: React.FormEvent) => {
        e.preventDefault();
        if (newDocTitle.trim()) {
            // onAddDocument({ // This needs to be passed down
            //     title: newDocTitle,
            //     category: newDocCategory,
            //     employeeId: employee.id,
            // });
            setNewDocTitle('');
            setNewDocCategory('Personal');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">
                        Bienvenido, {user.name}
                    </h2>
                    <p className="text-slate-600 mt-1">
                        Este es su portal personal en <span className="font-semibold">{company.name}</span>.
                    </p>
                </div>
                <button 
                    onClick={onRequestAbsence}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Solicitar Ausencia
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Section */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Mi Perfil</h3>
                    <img src={employee.avatarUrl} alt={employee.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-200" />
                    
                    {!isEditingProfile ? (
                        <div className="space-y-3 text-center">
                            <p className="text-2xl font-bold text-slate-800">{employee.name}</p>
                            <p className="text-slate-600">{position?.title}</p>
                            <p className="text-sm text-slate-500">{employee.email}</p>
                            <button onClick={() => setIsEditingProfile(true)} className="mt-2 text-sm text-blue-600 hover:underline font-semibold flex items-center gap-1 mx-auto">
                                <PencilIcon/> Editar Nombre
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div>
                                <label htmlFor="employee-name" className="block text-sm font-medium text-slate-700">Nombre Completo</label>
                                <input
                                    id="employee-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={() => setIsEditingProfile(false)} className="text-sm py-2 px-4 rounded-md hover:bg-slate-100">Cancelar</button>
                                <button type="submit" className="text-sm bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Guardar</button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                     <MyRequestsWidget requests={absenceRequests} />
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Mis Documentos</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                            {documents.length > 0 ? documents.map(doc => (
                                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="text-slate-500"><DocumentTextIcon /></div>
                                        <div>
                                            <p className="font-medium text-slate-800">{doc.title}</p>
                                            <p className="text-sm text-slate-500">{doc.category} - {new Date(doc.uploadDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <a href={doc.url} download className="text-blue-600 hover:underline text-sm font-semibold">
                                        Descargar
                                    </a>
                                </div>
                            )) : (
                                <p className="text-center text-slate-500 py-8">No tiene documentos subidos.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeView;