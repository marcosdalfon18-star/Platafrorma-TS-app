
import React from 'react';
import { Company, Plan } from '../../types';

interface AddCompanyModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddCompany: (companyData: Omit<Company, 'id'>) => Promise<void>;
	plans: Plan[];
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ isOpen, onClose, onAddCompany, plans }) => {
	const [name, setName] = React.useState('');
	const [address, setAddress] = React.useState('');
	const [contact, setContact] = React.useState('');
	const [planId, setPlanId] = React.useState(plans[0]?.id || '');
	const [industry, setIndustry] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			await onAddCompany({ name, address, contact, planId, industry, imageUrl: '', logoUrl: '', internalData: '' });
			setName(''); setAddress(''); setContact(''); setPlanId(plans[0]?.id || ''); setIndustry('');
		} catch (err) {
			setError('Error al agregar empresa.');
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
			<div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-[#2E7D32]/10">
				<h2 className="text-lg font-bold text-[#2E7D32] mb-2">Agregar Empresa</h2>
				<form className="space-y-3" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Nombre de la empresa"
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<input
						type="text"
						placeholder="Dirección"
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
						value={address}
						onChange={e => setAddress(e.target.value)}
						required
					/>
					<input
						type="text"
						placeholder="Contacto"
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
						value={contact}
						onChange={e => setContact(e.target.value)}
						required
					/>
					<select
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-sm"
						value={planId}
						onChange={e => setPlanId(e.target.value)}
						required
					>
						{plans.map(plan => (
							<option key={plan.id} value={plan.id}>{plan.name}</option>
						))}
					</select>
					<input
						type="text"
						placeholder="Industria"
						className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-sm"
						value={industry}
						onChange={e => setIndustry(e.target.value)}
					/>
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
export default AddCompanyModal;