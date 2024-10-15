import { DashboardHeader } from '@/components/UI/Dashboard/header';
import { NavBar } from '@/components/UI/Dashboard/navBar';


import { AuthProvider } from '@/utils/AuthProvider';
import './layout-style.scss';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			{/* <AuthProvider> */}
				<DashboardHeader />
				<main className={`dashboard`}>
					<NavBar />
					{children}
				</main>
			{/* </AuthProvider> */}
		</>
	);
}
