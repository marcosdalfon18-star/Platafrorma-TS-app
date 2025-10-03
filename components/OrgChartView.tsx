import React, { useState, useMemo } from 'react';
import { JOB_POSITIONS } from '../constants';
import { type Employee, type JobPosition, type UserPlan } from '../types';
import JobProfileModal from './JobProfileModal';

interface OrgChartNodeProps {
  employee: Employee;
  subordinates: Employee[];
  onNodeClick: (position: JobPosition) => void;
  employees: Employee[];
}

const OrgChartNode: React.FC<OrgChartNodeProps> = ({ employee, subordinates, onNodeClick, employees }) => {
  const position = JOB_POSITIONS.find(p => p.id === employee.positionId);

  const handleCardClick = () => {
    if (position) {
      onNodeClick(position);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        onClick={handleCardClick}
        className="bg-white p-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-t-4 border-blue-500 w-48 text-center"
      >
        <img src={employee.avatarUrl} alt={employee.name} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-200" />
        <p className="font-bold text-gray-800">{employee.name}</p>
        <p className="text-sm text-[#4A5A5B]">{position?.title}</p>
      </div>
      {subordinates.length > 0 && (
        <>
          <div className="w-px h-8 bg-gray-400" />
          <div className="flex justify-center">
            {subordinates.map((sub, index) => (
              <div key={sub.id} className="px-4 relative">
                {/* Horizontal line */}
                <div className="absolute top-0 left-1/2 w-full h-px bg-gray-400" style={{ right: index === 0 ? '50%' : undefined, left: index === subordinates.length - 1 ? '50%' : undefined, width: subordinates.length > 1 ? '100%' : '0' }} />
                {/* Vertical line from horizontal */}
                <div className="absolute top-0 left-1/2 w-px h-8 bg-gray-400" />
                <div className="mt-8">
                   <MemoizedNode employee={sub} onNodeClick={onNodeClick} employees={employees} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const MemoizedNode = React.memo(({ employee, onNodeClick, employees }: { employee: Employee; onNodeClick: (position: JobPosition) => void; employees: Employee[] }) => {
    const subordinates = useMemo(() => employees.filter(e => e.managerId === employee.id), [employee.id, employees]);
    return <OrgChartNode employee={employee} subordinates={subordinates} onNodeClick={onNodeClick} employees={employees} />;
});

interface OrgChartViewProps {
    employees: Employee[];
    userPlan: UserPlan;
}

const OrgChartView: React.FC<OrgChartViewProps> = ({ employees, userPlan }) => {
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);

  const rootEmployee = useMemo(() => employees.find(e => e.managerId === null), [employees]);

  const handleNodeClick = (position: JobPosition) => {
    setSelectedPosition(position);
  };

  const handleCloseModal = () => {
    setSelectedPosition(null);
  };
  
  if (!rootEmployee) {
    return <div className="text-center text-red-500">Error: No root employee found.</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-blue-50 rounded-lg min-h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Organigrama de la Empresa</h2>
      <div className="flex justify-center overflow-x-auto pb-8">
        <MemoizedNode employee={rootEmployee} onNodeClick={handleNodeClick} employees={employees} />
      </div>
      <JobProfileModal position={selectedPosition} onClose={handleCloseModal} userPlan={userPlan} />
    </div>
  );
};

export default OrgChartView;