
import React from 'react';
import { type Document } from '../types';
import DocumentTextIcon from './icons/DocumentTextIcon';
import UploadIcon from './icons/UploadIcon';

interface DocumentListWidgetProps {
    documents: Document[];
    onUploadClick: () => void;
}

const DocumentListWidget: React.FC<DocumentListWidgetProps> = ({ documents, onUploadClick }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-slate-800">Documentos</h3>
                <button
                    onClick={onUploadClick}
                    className="flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                    <UploadIcon />
                    Subir
                </button>
            </div>
            <div className="space-y-3">
                {documents.length > 0 ? documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="text-slate-500">
                                <DocumentTextIcon />
                            </div>
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
                     <p className="text-center text-slate-500 py-8">No hay documentos asociados.</p>
                )}
            </div>
        </div>
    );
};

export default DocumentListWidget;