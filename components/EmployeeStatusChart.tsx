import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type Employee, EmployeeStatus } from '../types';

interface EmployeeStatusChartProps {
    employees: Employee[];
}

const COLORS = {
    [EmployeeStatus.Active]: '#4CAF50', // green
    [EmployeeStatus.Vacation]: '#FFC107', // amber
    [EmployeeStatus.Inactive]: '#9E9E9E', // grey
};

const EmployeeStatusChart: React.FC<EmployeeStatusChartProps> = ({ employees }) => {
    const data = useMemo(() => {
        const counts = employees.reduce((acc, employee) => {
            acc[employee.status] = (acc[employee.status] || 0) + 1;
            return acc;
        }, {} as Record<EmployeeStatus, number>);

        // Shorten labels for better fit
        const formattedData = {
            'Activos': counts[EmployeeStatus.Active] || 0,
            'Vacaciones': counts[EmployeeStatus.Vacation] || 0,
            'Baja': counts[EmployeeStatus.Inactive] || 0,
        };

        return Object.entries(formattedData)
            .filter(([, value]) => value > 0)
            .map(([name, value]) => ({ name, value }));
    }, [employees]);

    const colorMapping = {
        'Activos': COLORS[EmployeeStatus.Active],
        'Vacaciones': COLORS[EmployeeStatus.Vacation],
        'Baja': COLORS[EmployeeStatus.Inactive],
    };

    if (employees.length === 0) {
        return (
             <div className="bg-white p-6 rounded-lg shadow-md h-96 flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Distribución de Capital Humano</h3>
                <p className="text-slate-500">No hay datos de empleados para mostrar.</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-96 flex flex-col">
            <div>
                <h3 className="text-xl font-semibold text-slate-800">Distribución de Capital Humano</h3>
                <p className="text-sm text-slate-500">Análisis visual del estado actual de su equipo.</p>
            </div>
            <div className="flex-grow w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius="80%"
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            // FIX: Explicitly type the label props as 'any' to resolve TypeScript errors with recharts prop type inference.
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                return (
                                    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontWeight="bold">
                                        {`${(percent * 100).toFixed(0)}%`}
                                    </text>
                                );
                            }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorMapping[entry.name as keyof typeof colorMapping]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`${value} empleado(s)`, 'Total']}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EmployeeStatusChart;