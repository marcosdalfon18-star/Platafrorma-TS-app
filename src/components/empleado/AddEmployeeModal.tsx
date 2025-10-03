
import React from 'react';
import { JobPosition, EmployeeStatus } from '../../types';

interface AddEmployeeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddEmployee: (data: { name: string; email: string; positionId: string; status: EmployeeStatus }) => Promise<void>;
	jobPositions: JobPosition[];
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAddEmployee, jobPositions }) => {
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [positionId, setPositionId] = React.useState(jobPositions[0]?.id || '');
	const [status, setStatus] = React.useState<EmployeeStatus>('activo');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			await onAddEmployee({ name, email, positionId, status });
			setName(''); setEmail(''); setPositionId(jobPositions[0]?.id || ''); setStatus('activo');
		} catch (err) {
			setError('Error al agregar empleado.');
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
			<div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-[#2E7D32]/10">
				<h2 className="text-lg font-bold text-[#2E7D32] mb-2">Agregar Empleado</h2>
				<form className="space-y-3" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Nombre"
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<input
						type="email"
						placeholder="Correo electrónico"
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<select
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-sm"
						value={positionId}
						onChange={e => setPositionId(e.target.value)}
						required
					>
						{jobPositions.map(pos => (
							<option key={pos.id} value={pos.id}>{pos.title}</option>
						))}
					</select>
					<select
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-sm"
						value={status}
						onChange={e => setStatus(e.target.value as EmployeeStatus)}
						required
					>
						<option value="activo">Activo</option>
						<option value="inactivo">Inactivo</option>
					</select>
					<div className="flex gap-2 mt-2">
						<button
							type="button"
							className="flex-1 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
							onClick={onClose}
							disabled={loading}
						>Cancelar</button>
						<button
							type="submit"
							className="flex-1 py-1.5 bg-[#2E7D32] hover:bg-[#1976D2] text-white font-semibold rounded transition-all text-sm shadow"
							disabled={loading}
						>{loading ? 'Guardando...' : 'Guardar'}</button>
					</div>
				</form>
				{error && <div className="mt-2 text-red-600 text-xs text-center">{error}</div>}
			</div>
		</div>
	);
};
export default AddEmployeeModal;