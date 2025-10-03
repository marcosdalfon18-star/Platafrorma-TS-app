import React from 'react';
import MarketingIcon from './icons/MarketingIcon';
import DownloadIcon from './icons/DownloadIcon';

const MarketingView: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full mr-4">
          <MarketingIcon />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Plan Estratégico de Marketing</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Herramientas y plantillas para definir su marca, identificar su mercado objetivo y crear estrategias de comunicación que impulsen el crecimiento de su negocio.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Definición de Marca</h3>
            <p className="text-gray-600 text-sm">Utilice nuestras plantillas guiadas para construir una identidad de marca sólida y coherente.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Acceder a Plantillas</button>
        </div>
         <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Análisis de Mercado</h3>
            <p className="text-gray-600 text-sm">Herramientas para identificar su público objetivo y analizar a sus competidores clave.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Iniciar Análisis</button>
        </div>
         <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Estrategia de Contenidos</h3>
            <p className="text-gray-600 text-sm">Desarrolle un plan de comunicación efectivo para atraer y retener clientes.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Crear Estrategia</button>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Plantillas Descargables</h3>
        <div className="space-y-4">
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-semibold text-gray-800">Plan de Marketing para Startups</h4>
              <p className="text-sm text-gray-600 mt-1">Una plantilla completa para guiar a las nuevas empresas en sus primeros pasos de marketing.</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm flex-shrink-0">
              <DownloadIcon />
              Descargar
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-semibold text-gray-800">Estrategia de Contenido para Redes Sociales</h4>
              <p className="text-sm text-gray-600 mt-1">Organice su calendario de publicaciones y defina su voz en las principales plataformas sociales.</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm flex-shrink-0">
              <DownloadIcon />
              Descargar
            </button>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-semibold text-gray-800">Plan de Lanzamiento de Producto</h4>
              <p className="text-sm text-gray-600 mt-1">Una guía paso a paso para asegurar un lanzamiento de producto exitoso en el mercado.</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm flex-shrink-0">
              <DownloadIcon />
              Descargar
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MarketingView;