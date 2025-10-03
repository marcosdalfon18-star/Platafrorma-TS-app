
import React from 'react';
import { Plan, UserPlan } from '../../types';

interface AddEditPlanModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (planData: Omit<Plan, 'id'>, id?: UserPlan) => Promise<void>;
	plan: Plan | null;
}

const AddEditPlanModal: React.FC<AddEditPlanModalProps> = (props) => <div>AddEditPlanModal</div>;
export default AddEditPlanModal;