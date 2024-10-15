'use client';

import { redirect } from 'next/navigation';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { TbDotsVertical } from 'react-icons/tb';

import { ActiveUser2, UserIcon1, UsersWithLoan, UsersWithSavings } from '@/components/svg/svgs3';
import { DashboardTablePagination } from '@/components/UI/Dashboard/tablePagination';

import { USER_WITHOUT_PASSWORD_TYPE } from '@/types';

import { useGlobals } from '@/context';
import { useAuthContext } from '@/utils/AuthProvider';
import useSWR from 'swr';

export function UserTable() {
	const {
		state: { users },
		dispatch,
	} = useGlobals();
	const {
		state: { isAuthenticated },
		isAuthPending,
	} = useAuthContext();

	useEffect(() => {
		if (!isAuthenticated && !isAuthPending) {
			redirect('/'); // Redirect to login if not authenticated
		}
	}, [isAuthenticated, isAuthPending]);

	const fetcher = async (url: string) => {
		if (!isAuthenticated) {
			return null;
		}
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}
		return res.json();
	};

	const { data, error, isLoading } = useSWR<USER_WITHOUT_PASSWORD_TYPE[], Error>('/users.json', fetcher);

	const memoizedDispatch = useCallback(() => {
		if (isAuthenticated && data && JSON.stringify(data) !== JSON.stringify(users)) {
			dispatch({ type: 'users', payload: { users: data } });
		}
	}, [data, users]);

	// Run the memoized dispatch logic inside the useEffect
	useEffect(() => {
		memoizedDispatch(); // Execute the dispatch if necessary
	}, [memoizedDispatch]);

	const [filters, setFilters] = useState({
		organization: { value: '' },
		username: { value: '' },
		email: { value: '' },
		phoneNumber: { value: '' },
		status: { value: '' }, // 'None' for no filter
	});

	const handleFilterChange = (field: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[field]: { value },
		}));
	};
	const resetFilters = () => {
		setFilters({
			organization: { value: '' },
			username: { value: '' },
			email: { value: '' },
			phoneNumber: { value: '' },
			status: { value: '' },
		});
	};
	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			return (
				(filters.organization.value ? user.organization.toLowerCase().includes(filters.organization.value.toLowerCase()) : true) &&
				(filters.username.value ? user.username.toLowerCase().includes(filters.username.value.toLowerCase()) : true) &&
				(filters.email.value ? user.email.toLowerCase().includes(filters.email.value.toLowerCase()) : true) &&
				(filters.phoneNumber.value ? user.phoneNumber.includes(filters.phoneNumber.value) : true) &&
				(filters.status.value && filters.status.value !== 'None' ? user.status === filters.status.value : true)
			);
		});
	}, [users, filters]);

	// Pagination State
	const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
	const [currentOption, setCurrentOption] = useState<{ value: string; label: string } | null>(null);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [itemOffset, setItemOffset] = useState(0);

	const [showModal, setShowModal] = useState(false); // Modal visibility state

	useEffect(() => {
		const generatedOptions = [10, 15].map((value) => ({
			value: `${value}`,
			label: `${value}`,
		}));

		setOptions(generatedOptions);
		setCurrentOption(generatedOptions[0]);
	}, []);

	const handleSelectChange = (option: { value: string; label: string } | null) => {
		if (option && currentOption?.value !== option.value) {
			const selectedValue = parseInt(option.value);
			if ([5, 10, 15].includes(selectedValue)) {
				setCurrentOption(option);
				setItemsPerPage(selectedValue);
			}
		}
	};

	const pageCount = useMemo(() => {
		return Math.ceil(filteredUsers.length / itemsPerPage);
	}, [filteredUsers.length, itemsPerPage]);

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = event.selected * itemsPerPage;
		setItemOffset(newOffset);
	};

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
						{!isLoading &&
							data &&
							data.length > 0 &&
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
							))}
					</tbody>
					{/* <tfoot>
					{!isLoading && data && data.length > 0 && filteredUsers.length === 0 && (
						<tr className="dashboard-users-not-found">
							<th
								scope="row"
								colSpan={4}>
								No Users found.
							</th>
						</tr>
					)}
				</tfoot> */}

					{/* {!data && (
						<tr className="dashboard-users-not-found">
							<th
								scope="row"
								colSpan={6}>
								No Users found.
							</th>
						</tr>
					)} */}
				</table>

				{!data && (
					<section className="dashboard-users-not-found">
						<p>No Users found.</p>
					</section>
				)}

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
							{/* <Dropdown
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
				{!isLoading && data && data.length > 0 && (
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
