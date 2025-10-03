import React from 'react';
import ReportsView from './ReportsView';
import AdvisoryLogView from './JobAnalysisView';
import CompanyView from '../empresa/CompanyView';
import EmployeeView from '../empleado/EmployeeView';
import UserManagementView from '../gestor/UserManagementView';

const ConsultorDashboard: React.FC = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold text-blue-900 mb-4">Panel Consultor</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-4"><h2>Empresas</h2><CompanyView /></div>
      <div className="bg-white rounded-lg shadow p-4"><h2>Empleados</h2><EmployeeView /></div>
      <div className="bg-white rounded-lg shadow p-4 col-span-2"><h2>Reportes</h2><ReportsView /></div>
      <div className="bg-white rounded-lg shadow p-4 col-span-2"><h2>Log de Asesorías</h2><AdvisoryLogView /></div>
      <div className="bg-white rounded-lg shadow p-4 col-span-2"><h2>Gestión de Usuarios</h2><UserManagementView /></div>
    </div>
  </div>
);

export default ConsultorDashboard;
