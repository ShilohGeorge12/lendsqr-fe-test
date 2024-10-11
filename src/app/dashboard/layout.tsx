import './layout-style.scss';

import { DashboardHeader } from '@/components/UI/Dashboard/header';
import { NavBar } from '@/components/UI/Dashboard/navBar';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<DashboardHeader />
			<main className={`dashboard-user`}>
				<NavBar />
				{children}
			</main>
		</>
	);
}
