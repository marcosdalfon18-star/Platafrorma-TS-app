import React from 'react';
import BookOpenIcon from './icons/BookOpenIcon';

const CompanyManualView: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full mr-4">
          <BookOpenIcon />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Manual de Empresa</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Aquí encontrará la cultura, visión, misión, políticas y normativas de la empresa. Un recurso
        centralizado para alinear a todo el equipo con los valores y procedimientos de la organización.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Nuestra Misión y Visión</h3>
            <p className="text-gray-600 text-sm">Documento que detalla el propósito fundamental y las aspiraciones a largo plazo de la compañía.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Leer documento</button>
        </div>
         <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Código de Conducta</h3>
            <p className="text-gray-600 text-sm">Establece las normas de comportamiento y los principios éticos que deben seguir todos los empleados.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Consultar código</button>
        </div>
         <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Política de Trabajo Remoto</h3>
            <p className="text-gray-600 text-sm">Lineamientos y buenas prácticas para los colaboradores que trabajan fuera de la oficina.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Ver política</button>
        </div>
         <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Procedimiento de Onboarding</h3>
            <p className="text-gray-600 text-sm">Guía paso a paso del proceso de incorporación para nuevos talentos, asegurando una integración exitosa.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Revisar procedimiento</button>
        </div>
      </div>

    </div>
  );
};

export default CompanyManualView;