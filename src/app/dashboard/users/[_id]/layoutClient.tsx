'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

import { useEffect } from 'react';

import { StarReview } from '@/components/UI/rating';

import { useGlobals } from '@/context';
import { useAuthContext } from '@/utils/AuthProvider';

export function LayoutClient({ _id }: { _id: string }) {
	const path = usePathname();
	const {
		state: { isAuthenticated },
		isAuthPending,
	} = useAuthContext();
	const {
		state: { users },
		dispatch,
	} = useGlobals();

	useEffect(() => {
		if (!isAuthenticated && !isAuthPending) {
			redirect('/');
		}
	}, [isAuthenticated, isAuthPending]);

	const user = users.find((user) => user._id === _id);
	const isBlacklisted = user?.status === 'Blacklisted';
	const isActive = user?.status === 'Active';

	return (
		<>
			<section className="dashboard-users-details-user-section">
				<h2>Users Details</h2>
				<div>
					<button
						type="button"
						name={`BLACKLIST USER button`}
						disabled={isBlacklisted}
						style={{ cursor: isBlacklisted ? 'default' : 'pointer' }}
						onClick={() => {
							if (!user) return;

							const updatedUsers: typeof users = users.map((allUser) => {
								if (allUser._id === _id) {
									return { ...allUser, status: 'Blacklisted' };
								}
								return allUser;
							});
							dispatch({ type: 'update_users', payload: { users: updatedUsers } });
						}}>
						BLACKLIST USER
					</button>
					<button
						type="button"
						name={`ACTIVATE USER button`}
						disabled={isActive}
						style={{ cursor: isActive ? 'default' : 'pointer' }}
						onClick={() => {
							if (!user) return;

							const updatedUsers: typeof users = users.map((allUser) => {
								if (allUser._id === _id) {
									return { ...allUser, status: 'Active' };
								}
								return allUser;
							});
							dispatch({ type: 'update_users', payload: { users: updatedUsers } });
						}}>
						ACTIVATE USER
					</button>
				</div>
			</section>

			{user && (
				<section className="dashboard-users-details-summary-section">
					<section className="dashboard-users-details-summary-details">
						<div className="dashboard-users-details-summary-details-image-container">
							<Image
								src={'/user.png'}
								alt="user profile"
								width={100}
								height={100}
							/>
						</div>

						<div className="dashboard-users-details-summary-details-username">
							<p>
								{user.fullname.firstname} {user.fullname.lastname}
							</p>
							<p>{user._id}</p>
						</div>

						<div className="dashboard-users-details-summary-details-user-tier">
							<p>User’s Tier</p>
							<StarReview tier={user.userTier} />
						</div>

						<div className="dashboard-users-details-summary-details-user-income">
							<p>
								{user.monthlyIncome === '₦200,000.00 - ₦400,000.00' ? '₦200,000.00' : user.monthlyIncome === '₦400,000.00 - ₦600,000.00' ? '₦400,000.00' : '₦600,000.00'}
							</p>
							<p>
								{user.transaction[0].accountNumber}/{user.transaction[0].bank}
							</p>
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
			)}
		</>
	);
}
