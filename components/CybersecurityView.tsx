import React, { useState } from 'react';
import { generateCybersecurityPractices } from '../services/geminiService';
import Spinner from './common/Spinner';

const CybersecurityView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [practices, setPractices] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleGeneratePractices = async () => {
    setIsLoading(true);
    setError('');
    setPractices([]);
    try {
      const generatedPractices = await generateCybersecurityPractices();
      setPractices(generatedPractices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Ciberseguridad</h2>
      <p className="text-gray-600 mb-6">
        Acceda a protocolos de seguridad y buenas prácticas adaptadas a su negocio para proteger
        la información y los activos digitales de la empresa, asegurando la continuidad y la
        confianza en sus operaciones.
      </p>

      <div className="mt-4">
        <button
          onClick={handleGeneratePractices}
          disabled={isLoading}
          className="w-full sm:w-auto flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          aria-live="polite"
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
              Generar Buenas Prácticas con IA
            </>
          )}
        </button>
      </div>

      {error && <p role="alert" className="mt-4 text-red-600 bg-red-100 p-3 rounded-md font-medium">{error}</p>}

      {practices.length > 0 && (
        <div className="mt-8 p-6 bg-blue-100 border rounded-lg border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Buenas Prácticas Recomendadas</h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            {practices.map((practice, index) => (
              <li key={index} className="pl-2">{practice}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CybersecurityView;