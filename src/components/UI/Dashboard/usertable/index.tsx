'use client';

import { redirect, useRouter } from 'next/navigation';

import { useEffect, useMemo, useState } from 'react';
import { FaUserTimes } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa6';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiFilter3Line } from 'react-icons/ri';

import { ActiveUser2, UserIcon1, UsersWithLoan, UsersWithSavings } from '@/components/svg/svgs3';
import { DashboardTablePagination } from '@/components/UI/Dashboard/tablePagination';
import { useFilterUsers } from '@/hooks/useFilterUsers';
import { usePagination } from '@/hooks/usePagination';

import { useGlobals } from '@/context';
import { useAuthContext } from '@/utils/AuthProvider';
import { useFetchUsers } from '../../../../hooks/useFetchUsers';
import { Spinner } from '../../loadingSpinner';
import { MenuOptions } from '../../options';

export function UserTable() {
	const {
		state: { isAuthenticated },
		isAuthPending,
	} = useAuthContext();
	const { dispatch } = useGlobals();
	const { push } = useRouter();

	useEffect(() => {
		if (!isAuthenticated && !isAuthPending) {
			redirect('/'); // Redirect to login if not authenticated
		}
	}, [isAuthenticated, isAuthPending]);

	const { error, users, isLoading } = useFetchUsers({ isAuthenticated, dataType: 'users' });
	const { filters, handleFilterChange, resetFilters, filteredUsers } = useFilterUsers({ users: users ? users : [] });
	const { options, currentOption, handleSelectChange, pageCount, handlePageClick, itemOffset, itemsPerPage } = usePagination({
		filteredUsers,
		itemsPerPageOptions: [15, 18, 20],
		indexOfFirstItemPerPage: 1,
	});

	// Modal state
	const [showModal, setShowModal] = useState(false);
	const [showSelectFilter, setShowSelectFilter] = useState(false);
	const activeUsers = useMemo(() => {
		return users ? users.filter((user) => user.status === 'Active').length : 0;
	}, [users]);

	const cards = [
		{
			id: '1',
			title: 'USERS',
			numbers: users ? users.length : 0,
			icon: <UserIcon1 />,
		},
		{
			id: '2',
			title: 'ACTIVE USERS',
			numbers: `${activeUsers}`,
			icon: <ActiveUser2 />,
		},
		{
			id: '3',
			title: 'USERS WITH LOANS',
			numbers: '12,453',
			icon: <UsersWithLoan />,
		},
		{
			id: '4',
			title: 'USERS WITH SAVINGS',
			numbers: '102,453',
			icon: <UsersWithSavings />,
		},
	];

	const blacklistUser = (_id: string) => {
		if (!users) return;

		const updatedUsers: typeof users = users.map((allUser) => {
			if (allUser._id === _id) {
				return { ...allUser, status: 'Blacklisted' };
			}
			return allUser;
		});
		dispatch({ type: 'update_users', payload: { users: updatedUsers } });
	};
	const activateUser = (_id: string) => {
		if (!users) return;

		const updatedUsers: typeof users = users.map((allUser) => {
			if (allUser._id === _id) {
				return { ...allUser, status: 'Active' };
			}
			return allUser;
		});
		dispatch({ type: 'update_users', payload: { users: updatedUsers } });
	};

	return (
		<>
			<section className="dashboard-users-cards-container">
				{cards.map((card) => (
					<section
						key={card.id}
						className="dashboard-users-cards">
						<span className="">{card.icon}</span>
						<p className="dashboard-users-cards-title">{card.title}</p>
						<p className="dashboard-users-cards-numbers">{card.numbers}</p>
					</section>
				))}
			</section>
			<section className="dashboard-users-table-container">
				{error && <div>An Error Occured while fetching users. Please try again.</div>}

				<table className="dashboard-users-table">
					<thead>
						<tr>
							<td
								className="dashboard-users-table-organization"
								onClick={() => setShowModal((prev) => !prev)}>
								ORGANIZATION
								<RiFilter3Line />
							</td>

							<td className="dashboard-users-table-username">
								USERNAME
								<RiFilter3Line />
							</td>

							<td className="dashboard-users-table-email">
								EMAIL
								<RiFilter3Line />
							</td>
							<td className="dashboard-users-table-phonenumber">
								PHONE NUMBER
								<RiFilter3Line />
							</td>
							<td className="dashboard-users-table-datejoined">
								DATE JOINED
								<RiFilter3Line />
							</td>
							<td className="dashboard-users-table-status">
								STATUS
								<RiFilter3Line />
							</td>
						</tr>
					</thead>
					<tbody>
						{filteredUsers &&
							filteredUsers.length > 0 &&
							filteredUsers.slice(itemOffset, itemOffset + itemsPerPage).map((user) => (
								<tr
									key={user._id}
									className="dashboard-users-table-user-field">
									<td>{user.organization}</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.phoneNumber}</td>
									<td>{user.DateJoined}</td>
									<td>
										<span
											className={
												user.status === 'Inactive' ? 'Inactive' : user.status === 'Pending' ? 'pending' : user.status === 'Blacklisted' ? 'blacklisted' : 'active'
											}>
											{user.status}
										</span>
									</td>
									<td
										className="options"
										style={{ cursor: 'pointer' }}>
										<MenuOptions>
											<button
												type="button"
												name={`visit user ${user.fullname.firstname} details`}
												onClick={() => push(`/dashboard/users/${user._id}`)}>
												<MdOutlineRemoveRedEye />
												View Details
											</button>
											<button
												type="button"
												name={`blacklist user ${user.fullname.firstname}`}
												onClick={() => blacklistUser(user._id)}>
												<FaUserTimes />
												Blacklist User
											</button>
											<button
												type="button"
												name={`activate user ${user.fullname.firstname}`}
												onClick={() => activateUser(user._id)}>
												<FaUserCheck />
												Activate User
											</button>
										</MenuOptions>
									</td>
								</tr>
							))}
					</tbody>
					<tfoot>
						{users && !isLoading && filteredUsers && filteredUsers.length === 0 && (
							<tr className="dashboard-users-not-found">
								<td
									scope="row"
									colSpan={6}>
									No Users were found.
								</td>
							</tr>
						)}
						{isLoading && (
							<tr className="dashboard-users-not-found">
								<td
									scope="row"
									colSpan={6}>
									<Spinner height />
								</td>
							</tr>
						)}
					</tfoot>
				</table>

				{showModal && (
					<section className="filtering-modal">
						<div className="filtering-modal-organization">
							<label htmlFor="organization">Organization</label>
							<input
								type="search"
								id="organization"
								value={filters.organization.value}
								onChange={(e) => handleFilterChange('organization', e.target.value)}
								placeholder="Search...."
							/>
						</div>
						<div className="filtering-modal-username">
							<label htmlFor="username">Username</label>
							<input
								type="search"
								id="username"
								value={filters.username.value}
								onChange={(e) => handleFilterChange('username', e.target.value)}
								placeholder="Search...."
							/>
						</div>
						<div className="filtering-modal-email">
							<label htmlFor="email">Email</label>
							<input
								type="search"
								id="email"
								value={filters.email.value}
								onChange={(e) => handleFilterChange('email', e.target.value)}
								placeholder="Search...."
							/>
						</div>
						<div className="filtering-modal-phonenumber">
							<label htmlFor="phonenumber">Phone Number</label>
							<input
								type="search"
								id="phonenumber"
								value={filters.phoneNumber.value}
								onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
								placeholder="Search...."
							/>
						</div>
						<div className="filtering-modal-status">
							<label htmlFor="status">Status</label>
							<div
								onClick={() => setShowSelectFilter((prev) => !prev)}
								className="filtering-modal-status-select">
								<p className="">{filters.status.value === '' ? 'None' : filters.status.value}</p>
								{showSelectFilter && (
									<ul>
										<li
											className={filters.status.value === '' ? 'status-active' : ''}
											onClick={() => {
												handleFilterChange('status', '');
												setShowSelectFilter(false);
											}}>
											None
										</li>
										<li
											className={filters.status.value === 'Active' ? 'status-active' : ''}
											onClick={() => {
												handleFilterChange('status', 'Active');
												setShowSelectFilter(false);
											}}>
											Active
										</li>
										<li
											className={filters.status.value === 'Inactive' ? 'status-active' : ''}
											onClick={() => {
												handleFilterChange('status', 'Inactive');
												setShowSelectFilter(false);
											}}>
											Inactive
										</li>
										<li
											className={filters.status.value === 'Blacklisted' ? 'status-active' : ''}
											onClick={() => {
												handleFilterChange('status', 'Blacklisted');
												setShowSelectFilter(false);
											}}>
											Blacklisted
										</li>
										<li
											className={filters.status.value === 'Pending' ? 'status-active' : ''}
											onClick={() => {
												handleFilterChange('status', 'Pending');
												setShowSelectFilter(false);
											}}>
											Pending
										</li>
									</ul>
								)}
							</div>
						</div>

						<div className="filtering-modal-btn">
							<button
								type="button"
								className="filtering-modal-btn-reset"
								onClick={resetFilters}>
								Reset
							</button>
							<button
								type="button"
								className="filtering-modal-btn-cancel"
								onClick={() => {
									resetFilters();
									setShowModal(false);
								}}>
								Cancel
							</button>
						</div>
					</section>
				)}

				{filteredUsers && filteredUsers.length > 0 && (
					<DashboardTablePagination
						totalUsers={users ? users.length : 0}
						options={options}
						pageCount={pageCount}
						currentOption={currentOption}
						handlePageClick={handlePageClick}
						handleSelectChange={handleSelectChange}
					/>
				)}
			</section>
		</>
	);
}
