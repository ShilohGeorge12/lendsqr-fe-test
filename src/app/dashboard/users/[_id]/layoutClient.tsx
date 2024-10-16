'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import pic from '@/assets/image_4.png';

export function LayoutClient({ _id }: { _id: string }) {
	const path = usePathname();
	// const {} = use

	return (
		<>
			<section className="dashboard-users-details-user-section">
				<h2>Users Details</h2>
				<div>
					<button
						type="button"
						name={`BLACKLIST USER button`}>
						BLACKLIST USER
					</button>
					<button
						type="button"
						name={`ACTIVATE USER button`}>
						ACTIVATE USER
					</button>
				</div>
			</section>

			<section className="dashboard-users-details-summary-section">
				<section className="dashboard-users-details-summary-details">
					<div className="dashboard-users-details-summary-details-image-container">
						<Image
							src={pic}
							alt=""
						/>
					</div>

					<div className="dashboard-users-details-summary-details-username">
						<p>Grace Effiom</p>
						<p>LSQFf587g90</p>
					</div>

					<div className="dashboard-users-details-summary-details-user-tier">
						<p>User’s Tier</p>
						<p>LSQFf587g90</p>
					</div>

					<div className="dashboard-users-details-summary-details-user-income">
						<p>₦200,000.00</p>
						<p>9912345678/Providus Bank</p>
					</div>
				</section>
				<section className="dashboard-users-details-summary-links">
					<Link
						href={`/dashboard/users/${_id}`}
						className={path === `/dashboard/users/${_id}` ? 'active' : ''}>
						General Details
					</Link>
					<Link
						href={`/dashboard/users/${_id}/documents`}
						className={path === `/dashboard/users/${_id}/documents` ? 'active' : ''}>
						Documents
					</Link>
					<Link
						href={`/dashboard/users/${_id}/bank_details`}
						className={path === `/dashboard/users/${_id}/bank_details` ? 'active' : ''}>
						Bank Details
					</Link>
					<Link
						href={`/dashboard/users/${_id}/loans`}
						className={path === `/dashboard/users/${_id}/loans` ? 'active' : ''}>
						Loans
					</Link>
					<Link
						href={`/dashboard/users/${_id}/savings`}
						className={path === `/dashboard/users/${_id}/savings` ? 'active' : ''}>
						Savings
					</Link>
					<Link
						href={`/dashboard/users/${_id}/app_and_system`}
						className={path === `/dashboard/users/${_id}/app_and_system` ? 'active' : ''}>
						App and System
					</Link>
				</section>
			</section>
		</>
	);
}
