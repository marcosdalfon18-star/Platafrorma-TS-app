import React, { useState } from 'react';
import { type JobPosition, type UserPlan } from '../types';
import { generateJobDescription } from '../services/geminiService';
import Spinner from './common/Spinner';
import { hasAccessToFeature } from '../features';

interface JobProfileModalProps {
  position: JobPosition | null;
  onClose: () => void;
  userPlan: UserPlan;
}

const JobProfileModal: React.FC<JobProfileModalProps> = ({ position, onClose, userPlan }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const canUseAI = hasAccessToFeature(userPlan, 'aiJobDescription');

  const handleGenerateDescription = async () => {
    if (!position || !canUseAI) return;
    setIsLoading(true);
    setError('');
    setGeneratedDescription('');
    try {
      const description = await generateJobDescription(position.title, position.responsibilities);
      setGeneratedDescription(description);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo generar la descripción.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!position) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
                <h3 className="text-2xl font-bold text-slate-800">{position.title}</h3>
                <p className="text-slate-500 mt-1">{position.description}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-slate-700">Responsabilidades Clave:</h4>
            <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1">
              {position.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="relative" title={!canUseAI ? "Disponible en el Plan Premium" : ""}>
                <button
                onClick={handleGenerateDescription}
                disabled={isLoading || !canUseAI}
                className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                {isLoading ? (
                    <>
                    <Spinner />
                    Generando...
                    </>
                ) : (
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM15 3a1 1 0 011 1v1.268a2 2 0 010 3.464V15a1 1 0 11-2 0V8.732a2 2 0 010-3.464V4a1 1 0 011-1z" />
                    </svg>
                    Generar Descripción de Puesto con IA
                    </>
                )}
                </button>
            </div>
          </div>

          {error && <p className="mt-4 text-red-500">{error}</p>}
          
          {generatedDescription && (
            <div className="mt-6 p-4 bg-blue-50 border rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Descripción Generada por IA</h4>
                <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                    {generatedDescription}
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobProfileModal;