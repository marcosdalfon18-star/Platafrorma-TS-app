import React, { useState, useEffect } from 'react';

interface UploadPayrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (period: string, fileName: string) => void;
}

const MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
        years.push(i);
    }
    return years;
};

const UploadPayrollModal: React.FC<UploadPayrollModalProps> = ({ isOpen, onClose, onUpload }) => {
    const currentMonth = MONTHS[new Date().getMonth()];
    const currentYear = new Date().getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMonth(currentMonth);
            setYear(currentYear);
            setFile(null);
            setFileName('');
            setIsDragging(false);
        }
    }, [isOpen, currentMonth, currentYear]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };
    
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
    const handleDragEnter = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            setFileName(e.dataTransfer.files[0].name);
            e.dataTransfer.clearData();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            const period = `${month} ${year}`;
            onUpload(period, file.name);
        }
    };

    if (!isOpen) return null;

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
                    <h3 className="text-xl font-semibold text-slate-800">Subir Nueva Nómina</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="payroll-month" className="block text-sm font-medium text-slate-700">Mes</label>
                                <select
                                    id="payroll-month"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="payroll-year" className="block text-sm font-medium text-slate-700">Año</label>
                                <select
                                    id="payroll-year"
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                    className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {getYears().map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-slate-700">Archivo de Nómina</label>
                             <div 
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${
                                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300'
                                }`}
                             >
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-slate-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                            <span>Seleccione un archivo</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required />
                                        </label>
                                        <p className="pl-1">o arrástrelo aquí</p>
                                    </div>
                                    <p className="text-xs text-slate-500">PDF, CSV, XLSX hasta 10MB</p>
                                    {fileName && <p className="text-sm text-green-600 font-medium pt-2">{fileName}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400" disabled={!file}>Subir Nómina</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadPayrollModal;