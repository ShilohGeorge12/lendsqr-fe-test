'use client';

import { redirect } from 'next/navigation';

import { useEffect, useMemo, useState } from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { TbDotsVertical } from 'react-icons/tb';
import Select from 'react-select/base';

import { ActiveUser2, UserIcon1, UsersWithLoan, UsersWithSavings } from '@/components/svg/svgs3';
import { DashboardTablePagination } from '@/components/UI/Dashboard/tablePagination';
import { useFilterUsers } from '@/hooks/useFilterUsers';
import { usePagination } from '@/hooks/usePagination';

import { useAuthContext } from '@/utils/AuthProvider';
import { useFetchUsers } from '../../../../hooks/useFetchUsers';

export function UserTable() {
	const {
		state: { isAuthenticated },
		isAuthPending,
	} = useAuthContext();

	useEffect(() => {
		if (!isAuthenticated && !isAuthPending) {
			redirect('/'); // Redirect to login if not authenticated
		}
	}, [isAuthenticated, isAuthPending]);

	const { data, error, isLoading, users } = useFetchUsers(isAuthenticated);
	const { filters, handleFilterChange, resetFilters, filteredUsers } = useFilterUsers({ users });
	const { options, currentOption, handleSelectChange, pageCount, handlePageClick, itemOffset, itemsPerPage } = usePagination({ filteredUsers });

	// Modal state
	const [showModal, setShowModal] = useState(false);
	const activeUsers = useMemo(() => {
		return users.filter((user) => user.status === 'Active').length;
	}, [users]);

	const cards = [
		{
			id: '1',
			title: 'USERS',
			numbers: `${users.length}`,
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
						{
							// data &&
							// 	data.length > 0 &&
							filteredUsers &&
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
										<td>
											<TbDotsVertical />
										</td>
									</tr>
								))
						}
					</tbody>
					<tfoot>
						{filteredUsers && filteredUsers.length === 0 && (
							<tr className="dashboard-users-not-found">
								<td
									scope="row"
									colSpan={6}>
									No Users found.
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
							{/* <Select
					id={'react-select-2-live-region'}
					menuPlacement="auto"
					classNamePrefix={'dashboard-users-items-select'}
					options={options}
					styles={customStyles}
					value={currentOption}
					onChange={handleSelectChange}
				/>
							<Dropdown
								placeholder="Select"
								value={filters.status.value === '' ? 'None' : filters.status.value}
								onChange={(e) => handleFilterChange('status', e.target.value)}
								options={['None', 'Active', 'Inactive', 'Blacklisted', 'Pending']}
							/> */}
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

				{/* {!isLoading && !data && ( */}
				{filteredUsers && filteredUsers.length > 0 && (
					<DashboardTablePagination
						totalUsers={users.length}
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
