import { Suspense } from 'react';

import { UserTable } from '@/components/UI/Dashboard/usertable';

import '../dashboard-table.scss';

export default async function DashboardUser() {
	return (
		<section className="dashboard-users">
			<section className="dashboard-users-user-section">
				<h2>Users</h2>
			</section>

			<Suspense>
				<UserTable />
			</Suspense>
		</section>
	);
}
