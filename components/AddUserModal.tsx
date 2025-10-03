import React, { useState, useEffect } from 'react';
import { type User, type UserRole, type Company } from '../types';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddUser: (user: Omit<User, 'id'>) => void;
    companies: Company[];
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser, companies }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>('empleado');
    const [companyId, setCompanyId] = useState<number | undefined>(companies[0]?.id);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setEmail('');
            setRole('empleado');
            setCompanyId(companies[0]?.id);
        }
    }, [isOpen, companies]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userData: Omit<User, 'id'> = {
            name,
            email,
            role,
            companyId: role === 'consultor' ? undefined : companyId,
        };
        onAddUser(userData);
    };

    if (!isOpen) return null;

    const needsCompany = role === 'empresa' || role === 'empleado' || role === 'gestor';

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-slate-800">Añadir Nuevo Usuario</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="user-name" className="block text-sm font-medium text-slate-700">Nombre Completo</label>
                            <input
                                id="user-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="user-email" className="block text-sm font-medium text-slate-700">Email</label>
                            <input
                                id="user-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="user-role" className="block text-sm font-medium text-slate-700">Rol</label>
                            <select
                                id="user-role"
                                value={role}
                                onChange={(e) => setRole(e.target.value as UserRole)}
                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="consultor">Consultor</option>
                                <option value="empresa">Empresa</option>
                                <option value="empleado">Empleado</option>
                                <option value="gestor">Gestor</option>
                            </select>
                        </div>
                        {needsCompany && (
                            <div>
                                <label htmlFor="user-company" className="block text-sm font-medium text-slate-700">Empresa</label>
                                <select
                                    id="user-company"
                                    value={companyId}
                                    onChange={(e) => setCompanyId(Number(e.target.value))}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required={needsCompany}
                                >
                                    {companies.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Añadir Usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;