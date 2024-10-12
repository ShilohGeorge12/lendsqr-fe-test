import type { Metadata } from 'next';
import { DashboardHeader } from '@/components/UI/Dashboard/header';
import { NotFoundClient } from '@/components/UI/notfoundClient';

import '../app/dashboard/layout-style.scss';
import '../scss/not-found.scss';

export const metadata: Metadata = {
	title: `404 - Page Not Found`,
	description: `404 Error - The Page you are looking for was Not Found.`,
};

export default function NotFound() {
	return (
		<NotFoundClient>
			<DashboardHeader />
		</NotFoundClient>
	);
}
