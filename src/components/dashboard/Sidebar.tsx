
import React from 'react';
import { User, Company } from '../../types';

interface SidebarProps {
	currentView: string;
	setCurrentView: React.Dispatch<React.SetStateAction<string>>;
	userPlan: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	currentUser: User;
	selectedCompany: Company | null;
	onBackToDashboard: () => void;
	isManager: boolean;
}

const Sidebar: React.FC<SidebarProps> = (props) => <aside>Sidebar</aside>;
export default Sidebar;