import Link from 'next/link';

import { BackArrow } from '@/components/svg/svgs3';

import { LayoutClient } from './layoutClient';
import './user-details-styles.scss';

export default function UserDetailsLayoutPage({ children, params }: { children: React.ReactNode; params: { _id: string } }) {
	return (
		<section className="dashboard-users-details">
			<section className="dashboard-users-details-backlink">
				<Link href={'/dashboard/users'}>
					<BackArrow />
					Back to Users
				</Link>
			</section>
			<LayoutClient _id={params._id} />
			{children}
		</section>
	);
}
