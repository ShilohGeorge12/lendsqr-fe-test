import { Suspense } from 'react';

import '../dashboard-table.scss';
import { GuarantorsTable } from './gurantorTables';

export default async function GuarantorsPage() {
	return (
		<section className="dashboard-users">
			<section className="dashboard-users-user-section">
				<h2>Guarantors</h2>
			</section>

			<Suspense>
				<GuarantorsTable />
			</Suspense>
		</section>
	);
}
