import React from 'react';
import { type PayrollDocument } from '../types';
import UploadIcon from './icons/UploadIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';

interface PayrollViewProps {
    payrolls: PayrollDocument[];
    onUploadClick: () => void;
    onSendPayroll: (payrollId: number) => void;
}

const statusColors: Record<PayrollDocument['status'], string> = {
    'Subido': 'bg-yellow-100 text-yellow-800',
    'Enviado': 'bg-green-100 text-green-800',
};

const PayrollView: React.FC<PayrollViewProps> = ({ payrolls, onUploadClick, onSendPayroll }) => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Gestión de Nóminas</h2>
                    <p className="text-gray-600 mt-1">Suba y gestione los documentos de nómina de sus empleados.</p>
                </div>
                <button
                    onClick={onUploadClick}
                    className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <UploadIcon />
                    Subir Nueva Nómina
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Historial de Nóminas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-3 font-semibold text-slate-600">Período</th>
                                <th className="p-3 font-semibold text-slate-600">Nombre del Archivo</th>
                                <th className="p-3 font-semibold text-slate-600">Fecha de Carga</th>
                                <th className="p-3 font-semibold text-slate-600">Estado</th>
                                <th className="p-3 font-semibold text-slate-600 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.length > 0 ? payrolls.map(doc => (
                                <tr key={doc.id} className="border-b hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-800">{doc.period}</td>
                                    <td className="p-3 text-slate-600">{doc.fileName}</td>
                                    <td className="p-3 text-slate-600">{new Date(doc.uploadDate).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[doc.status]}`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right space-x-4">
                                        <button
                                            onClick={() => onSendPayroll(doc.id)}
                                            disabled={doc.status === 'Enviado'}
                                            className="text-green-600 hover:underline disabled:text-slate-400 disabled:no-underline font-semibold text-sm"
                                        >
                                            Enviar a Empleados
                                        </button>
                                        <a 
                                            href={doc.url} 
                                            download 
                                            className="text-blue-600 hover:underline font-semibold text-sm"
                                        >
                                            Descargar
                                        </a>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-12">
                                        <p className="text-slate-500">No se han subido nóminas todavía.</p>
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

export default PayrollView;