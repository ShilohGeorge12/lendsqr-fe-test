import { Suspense } from 'react';

import { UserTable } from '@/components/UI/Dashboard/usertable';

import '../dashboard-table.scss';

export default async function GuarantorsPage() {
	return (
		<section className="dashboard-users guarantors">
			<section className="dashboard-users-user-section">
				<h2>Guarantors</h2>
			</section>

			<Suspense>
				<UserTable />
			</Suspense>
		</section>
	);
}
