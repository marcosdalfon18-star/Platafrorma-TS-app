import React from 'react';
import { type User, type Company } from '../types';

interface UserManagementViewProps {
    users: User[];
    companies: Company[];
    onAddUserClick: () => void;
}

const UserManagementView: React.FC<UserManagementViewProps> = ({ users, companies, onAddUserClick }) => {
    const companyMap = new Map(companies.map(c => [c.id, c.name]));

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Gestión de Usuarios</h2>
                    <p className="text-gray-600 mt-1">Añada, vea y gestione los usuarios de la plataforma.</p>
                </div>
                <button
                    onClick={onAddUserClick}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex-shrink-0"
                >
                    Añadir Nuevo Usuario
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-3 font-semibold text-slate-600">Nombre</th>
                                <th className="p-3 font-semibold text-slate-600">Email</th>
                                <th className="p-3 font-semibold text-slate-600">Rol</th>
                                <th className="p-3 font-semibold text-slate-600">Empresa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-800">{user.name}</td>
                                    <td className="p-3 text-slate-600">{user.email}</td>
                                    <td className="p-3 text-slate-600 capitalize">{user.role}</td>
                                    <td className="p-3 text-slate-600">
                                        {user.companyId ? companyMap.get(user.companyId) || 'N/A' : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagementView;