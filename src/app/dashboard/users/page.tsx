import { Metadata } from 'next';

import { Suspense } from 'react';

import { UserTable } from '@/components/UI/Dashboard/usertable';

import { env } from '@/env';
import '../dashboard-table.scss';

const url = env.BASE_URL;

const title = 'User Dashboard';
const description =
	'View and manage all users within the Lendsqr User Dashboard management application. Efficiently handle user data, statuses, and actions in a streamlined interface. Built using React, TypeScript, and SCSS for performance and usability.';
const keywords = 'Lendsqr, user dashboard, user management, data management, user actions, React, TypeScript, SCSS, admin dashboard';

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title,
	description,
	keywords,
	openGraph: {
		title,
		description,
	},
	twitter: {
		card: 'summary',
		site: `${url}/dashboard/users`,
	},
	appleWebApp: { capable: true, startupImage: '/logo.png' },
	alternates: { canonical: `${url}/dashboard/users` },
};

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
