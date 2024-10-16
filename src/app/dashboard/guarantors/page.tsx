import { Metadata } from 'next/types';

import { Suspense } from 'react';

import { env } from '@/env';
import '../dashboard-table.scss';
import { GuarantorsTable } from './gurantorTables';

const url = env.BASE_URL;

const title = 'Guarantor Management';
const description =
	'Manage and review user guarantor details within the Lendsqr User Dashboard. Easily access and update guarantor relationships and information. Built using React, TypeScript, and SCSS for optimal functionality and performance.';
const keywords = 'Lendsqr, guarantor management, user dashboard, guarantors, user guarantors, data management, React, TypeScript, SCSS, admin dashboard';

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title,
	description,
	keywords,
	openGraph: {
		title,
		description,
		siteName: 'lendsqr-fe-test',
		emails: ['shilohgeorge2019@gmail.com'],
		images: ['Union.png'],
	},
	twitter: {
		card: 'summary',
		site: `${url}/dashboard/guarantors`,
		creator: 'Shiloh George',
		images: '/Union.png',
	},
	appleWebApp: { title, capable: true, startupImage: '/logo.png' },
	alternates: { canonical: `${url}/dashboard/guarantors` },
};

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
