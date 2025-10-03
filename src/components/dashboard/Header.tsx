
import React from 'react';
import { User, Company } from '../../types';

interface HeaderProps {
	currentView: string;
	onLogout: () => Promise<void>;
	onMenuClick: () => void;
	userPlan: string;
	currentUser: User;
	selectedCompany: Company | null;
}

const Header: React.FC<HeaderProps> = (props) => <header>Header</header>;
export default Header;