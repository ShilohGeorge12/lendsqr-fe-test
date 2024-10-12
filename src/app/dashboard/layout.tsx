import { DashboardHeader } from '@/components/UI/Dashboard/header';
import { NavBar } from '@/components/UI/Dashboard/navBar';

import './layout-style.scss';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<DashboardHeader />
			<main className={`dashboard`}>
				<NavBar />
				{children}
			</main>
		</>
	);
}
