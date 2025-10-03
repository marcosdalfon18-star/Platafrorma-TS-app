import React, { useState, useMemo } from 'react';
import { type Report, type ReportCategory } from '../types';

interface ReportsViewProps {
  reports: Report[];
}

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
    const categoryStyles: Record<ReportCategory, string> = {
        'Recursos Humanos': 'bg-blue-100 text-blue-800',
        'Marketing Estratégico': 'bg-green-100 text-green-800',
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryStyles[report.category]}`}>
                        {report.category}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.summary}</p>
            </div>
            <a 
                href={report.downloadUrl}
                download
                className="self-start mt-2 inline-block bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg transition-colors text-sm"
            >
                Descargar Informe
            </a>
        </div>
    );
};


const ReportsView: React.FC<ReportsViewProps> = ({ reports }) => {
  const [filter, setFilter] = useState<ReportCategory | 'Todos'>('Todos');

  const filteredReports = useMemo(() => {
    if (filter === 'Todos') return reports;
    return reports.filter(r => r.category === filter);
  }, [reports, filter]);

  const categories: ('Todos' | ReportCategory)[] = ['Todos', 'Recursos Humanos', 'Marketing Estratégico'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Centro de Informes</h2>
        <p className="text-gray-600 mt-1">Acceda a informes personalizados sobre su organización.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
            <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    filter === category 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                }`}
            >
                {category}
            </button>
        ))}
      </div>

      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map(report => <ReportCard key={report.id} report={report} />)}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border-2 border-dashed">
            <p className="text-gray-500">No se encontraron informes para la categoría seleccionada.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsView;