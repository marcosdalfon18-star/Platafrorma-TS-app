import React, { useState } from 'react';
import { generateHrPolicy, generateOnboardingChecklist } from '../services/geminiService';
import Spinner from './common/Spinner';

const AIAgentsView: React.FC = () => {
    // State for HR Policy Agent
    const [policyTopic, setPolicyTopic] = useState('');
    const [policyPoints, setPolicyPoints] = useState('');
    const [isPolicyLoading, setIsPolicyLoading] = useState(false);
    const [generatedPolicy, setGeneratedPolicy] = useState('');
    const [policyError, setPolicyError] = useState('');

    // State for Onboarding Assistant Agent
    const [employeeName, setEmployeeName] = useState('');
    const [employeePosition, setEmployeePosition] = useState('');
    const [startDate, setStartDate] = useState('');
    const [isOnboardingLoading, setIsOnboardingLoading] = useState(false);
    const [generatedChecklist, setGeneratedChecklist] = useState<Record<string, string[]>>({});
    const [onboardingError, setOnboardingError] = useState('');

    const handleGeneratePolicy = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPolicyLoading(true);
        setPolicyError('');
        setGeneratedPolicy('');
        try {
            const result = await generateHrPolicy(policyTopic, policyPoints);
            setGeneratedPolicy(result);
        } catch (err) {
            setPolicyError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsPolicyLoading(false);
        }
    };

    const handleGenerateOnboarding = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsOnboardingLoading(true);
        setOnboardingError('');
        setGeneratedChecklist({});
        try {
            const result = await generateOnboardingChecklist(employeeName, employeePosition, startDate);
            setGeneratedChecklist(result);
        } catch (err) {
            setOnboardingError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsOnboardingLoading(false);
        }
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Maybe add a notification here in the future
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Agentes IA</h2>
                <p className="text-gray-600 mt-1">Asistentes inteligentes para automatizar y mejorar sus procesos de RRHH.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* HR Policy Generator Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Generador de Políticas de RRHH</h3>
                    <form onSubmit={handleGeneratePolicy} className="space-y-4">
                        <div>
                            <label htmlFor="policy-topic" className="block text-sm font-medium text-gray-700">Tema de la Política</label>
                            <input
                                id="policy-topic"
                                type="text"
                                value={policyTopic}
                                onChange={e => setPolicyTopic(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Ej: Trabajo Remoto, Código de Conducta"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="policy-points" className="block text-sm font-medium text-gray-700">Puntos Clave a Incluir</label>
                            <textarea
                                id="policy-points"
                                value={policyPoints}
                                onChange={e => setPolicyPoints(e.target.value)}
                                rows={4}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="- Horario flexible&#10;- Equipamiento proporcionado&#10;- Reuniones semanales"
                                required
                            />
                        </div>
                        <button type="submit" disabled={isPolicyLoading} className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300">
                            {isPolicyLoading ? <><Spinner /> Generando...</> : 'Generar Política'}
                        </button>
                    </form>
                    {policyError && <p className="mt-4 text-red-500">{policyError}</p>}
                    {generatedPolicy && (
                        <div className="mt-6 p-4 bg-blue-100 border rounded-lg max-h-96 overflow-y-auto">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-gray-800">Política Generada</h4>
                                <button onClick={() => copyToClipboard(generatedPolicy)} className="text-sm text-blue-600 hover:underline">Copiar</button>
                            </div>
                            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">{generatedPolicy}</div>
                        </div>
                    )}
                </div>

                {/* Onboarding Assistant Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Asistente de Onboarding</h3>
                    <form onSubmit={handleGenerateOnboarding} className="space-y-4">
                        <div>
                            <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700">Nombre del Empleado</label>
                            <input id="employee-name" type="text" value={employeeName} onChange={e => setEmployeeName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="employee-position" className="block text-sm font-medium text-gray-700">Puesto</label>
                            <input id="employee-position" type="text" value={employeePosition} onChange={e => setEmployeePosition(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                            <input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                        </div>
                        <button type="submit" disabled={isOnboardingLoading} className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300">
                            {isOnboardingLoading ? <><Spinner /> Generando...</> : 'Crear Plan de Onboarding'}
                        </button>
                    </form>
                    {onboardingError && <p className="mt-4 text-red-500">{onboardingError}</p>}
                    {Object.keys(generatedChecklist).length > 0 && (
                        <div className="mt-6 p-4 bg-blue-100 border rounded-lg max-h-96 overflow-y-auto">
                            <h4 className="font-semibold text-gray-800 mb-2">Plan para {employeeName}</h4>
                            <div className="space-y-3">
                                {Object.entries(generatedChecklist).map(([day, tasks]) => (
                                    <div key={day}>
                                        <p className="font-medium text-gray-700">{day}</p>
                                        <ul className="list-disc list-inside ml-4 text-sm text-gray-600 space-y-1 mt-1">
                                            {/* FIX: Check if tasks is an array before calling map to resolve 'unknown' type error. */}
                                            {Array.isArray(tasks) && tasks.map((task, index) => <li key={index}>{task}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIAgentsView;
