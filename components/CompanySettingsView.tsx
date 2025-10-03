import React, { useState, useEffect } from 'react';
import { type Company, type CompanySettings } from '../types';

interface CompanySettingsViewProps {
    company: Company;
    settings: CompanySettings;
    onSave: (newSettings: CompanySettings) => void;
}

const CompanySettingsView: React.FC<CompanySettingsViewProps> = ({ company, settings, onSave }) => {
    const [currentSettings, setCurrentSettings] = useState(settings);

    useEffect(() => {
        setCurrentSettings(settings);
    }, [settings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation to ensure thresholds are sequential
        if (currentSettings.lateArrivalPolicy.suspensionThreshold <= currentSettings.lateArrivalPolicy.warningThreshold ||
            currentSettings.lateArrivalPolicy.terminationThreshold <= currentSettings.lateArrivalPolicy.suspensionThreshold) {
            alert("Los umbrales para llegadas tardías deben ser progresivos (Amonestación < Suspensión < Despido).");
            return;
        }
        onSave(currentSettings);
    };

    const handleLatePolicyChange = (field: keyof typeof currentSettings.lateArrivalPolicy, value: string) => {
        setCurrentSettings(prev => ({
            ...prev,
            lateArrivalPolicy: {
                ...prev.lateArrivalPolicy,
                [field]: Math.max(0, parseInt(value, 10))
            }
        }));
    };
    
    const handleAbsencePolicyChange = (field: keyof typeof currentSettings.absencePolicy, value: string) => {
         setCurrentSettings(prev => ({
            ...prev,
            absencePolicy: {
                ...prev.absencePolicy,
                [field]: Math.max(0, parseInt(value, 10))
            }
        }));
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Configuración de Políticas</h2>
                <p className="text-slate-600 mt-1">
                    Defina las reglas disciplinarias y de asistencia para <span className="font-semibold">{company.name}</span>.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Late Arrival Policy Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-slate-800 border-b pb-4 mb-4">Política de Llegadas Tardías</h3>
                     <p className="text-sm text-slate-500 mb-4">
                        Establezca una política disciplinaria progresiva. Las acciones se generarán cuando un empleado supere el umbral de llegadas tardías dentro de un mismo mes.
                    </p>
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="warning-threshold" className="block text-sm font-medium text-slate-700">Amonestación Escrita</label>
                            <p className="text-xs text-slate-500 mb-1">Generar amonestación después de:</p>
                            <div className="flex items-center gap-2">
                                <input
                                    id="warning-threshold"
                                    type="number"
                                    value={currentSettings.lateArrivalPolicy.warningThreshold}
                                    onChange={(e) => handleLatePolicyChange('warningThreshold', e.target.value)}
                                    className="block w-24 border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    min="1"
                                />
                                <span className="text-slate-600">llegadas tardías.</span>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="suspension-threshold" className="block text-sm font-medium text-slate-700">Suspensión de Empleo</label>
                             <p className="text-xs text-slate-500 mb-1">Generar suspensión después de:</p>
                            <div className="flex items-center gap-2">
                                <input
                                    id="suspension-threshold"
                                    type="number"
                                    value={currentSettings.lateArrivalPolicy.suspensionThreshold}
                                    onChange={(e) => handleLatePolicyChange('suspensionThreshold', e.target.value)}
                                    className="block w-24 border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    min={currentSettings.lateArrivalPolicy.warningThreshold + 1}
                                />
                                 <span className="text-slate-600">llegadas tardías.</span>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="termination-threshold" className="block text-sm font-medium text-slate-700">Despido</label>
                             <p className="text-xs text-slate-500 mb-1">Generar despido después de:</p>
                            <div className="flex items-center gap-2">
                                <input
                                    id="termination-threshold"
                                    type="number"
                                    value={currentSettings.lateArrivalPolicy.terminationThreshold}
                                    onChange={(e) => handleLatePolicyChange('terminationThreshold', e.target.value)}
                                    className="block w-24 border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    min={currentSettings.lateArrivalPolicy.suspensionThreshold + 1}
                                />
                                <span className="text-slate-600">llegadas tardías.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unjustified Absence Policy Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-slate-800 border-b pb-4 mb-4">Política de Ausencias Injustificadas</h3>
                     <p className="text-sm text-slate-500 mb-4">
                        Defina cuándo se debe generar una alerta por ausencias no justificadas (categorizadas como 'Otro') en un mismo mes.
                    </p>
                    <div>
                        <label htmlFor="absence-threshold" className="block text-sm font-medium text-slate-700">Alerta por Ausencia</label>
                        <p className="text-xs text-slate-500 mb-1">Generar alerta después de:</p>
                         <div className="flex items-center gap-2">
                            <input
                                id="absence-threshold"
                                type="number"
                                value={currentSettings.absencePolicy.warningThreshold}
                                onChange={(e) => handleAbsencePolicyChange('warningThreshold', e.target.value)}
                                className="block w-24 border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                min="1"
                            />
                             <span className="text-slate-600">ausencia(s) injustificada(s).</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 sticky bottom-0 border-t flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Guardar Políticas
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompanySettingsView;