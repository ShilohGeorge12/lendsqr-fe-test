'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { TbDotsVertical } from 'react-icons/tb';

import { DashboardTablePagination } from '@/components/UI/Dashboard/tablePagination';

import { USER_WITHOUT_PASSWORD_TYPE } from '@/types';

import { useGlobals } from '@/context';
import useSWR from 'swr';
import { Spinner } from '../../loadingSpinner';

export function UserTable() {
	const {
		state: { users },
		dispatch,
	} = useGlobals();

	const fetcher = (url: string) =>
		fetch(url).then((res) => {
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			return res.json();
		});

	const { data, error } = useSWR<USER_WITHOUT_PASSWORD_TYPE[], Error>('/users.json', fetcher);

	const memoizedDispatch = useCallback(() => {
		if (data && JSON.stringify(data) !== JSON.stringify(users)) {
			dispatch({ type: 'users', payload: { users: data } });
		}
	}, [data, users]);

	// Run the memoized dispatch logic inside the useEffect
	useEffect(() => {
		memoizedDispatch(); // Execute the dispatch if necessary
	}, [memoizedDispatch]);

	// Pagination State
	const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
	const [currentOption, setCurrentOption] = useState<{ value: string; label: string } | null>(null);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		const generatedOptions = [5, 10, 15].map((value) => ({
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

	const currentItems = useMemo(() => {
		return users.slice(itemOffset, itemOffset + itemsPerPage);
	}, [users, itemOffset, itemsPerPage]);
	// const currentItems = users.slice(itemOffset, itemOffset + itemsPerPage);
	// const pageCount = Math.ceil(users.length / itemsPerPage);

	const pageCount = useMemo(() => {
		return Math.ceil(users.length / itemsPerPage);
	}, [users.length, itemsPerPage]);

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = event.selected * itemsPerPage;
		setItemOffset(newOffset);
	};

	return (
		<>
			{error && <div>Error loading users. Please try again.</div>}
			{!data && (
				<div className="loading-data">
					<Spinner height />
				</div>
			)}

			{data && (
				<>
					<ul className="dashboard-users-table">
						<li className="dashboard-users-table-organization">
							<p>ORGANIZATION</p>
							<span>
								<RiFilter3Line />
							</span>
						</li>
						<li className="dashboard-users-table-username">
							<p>USERNAME</p>
							<span>
								<RiFilter3Line />
							</span>
						</li>
						<li className="dashboard-users-table-email">
							<p>EMAIL</p>
							<span>
								<RiFilter3Line />
							</span>
						</li>
						<li className="dashboard-users-table-phonenumber">
							<p>PHONE NUMBER</p>
							<span>
								<RiFilter3Line />
							</span>
						</li>
						<li className="dashboard-users-table-datejoined">
							<p>DATE JOINED</p>
							<span>
								<RiFilter3Line />
							</span>
						</li>
						<li className="dashboard-users-table-status">
							<p>
								<span>STATUS</span>
								<span className="icon">
									<RiFilter3Line />
								</span>
							</p>
						</li>
						{currentItems.map((user) => (
							<li
								key={user._id}
								className="dashboard-users-table-user-field">
								<div className="dashboard-users-table-user-field-organization">{user.organization}</div>
								<div className="dashboard-users-table-user-field-username">{user.username}</div>
								<div className="dashboard-users-table-user-field-email">{user.email}</div>
								<div className="dashboard-users-table-user-field-phonenumber">{user.phoneNumber}</div>
								<div className="dashboard-users-table-user-field-datejoined">{user.DateJoined}</div>
								<div className="dashboard-users-table-user-field-status">
									<p className="dashboard-users-table-user-field-status-details">
										<span
											className={
												user.status === 'Inactive' ? 'Inactive' : user.status === 'Pending' ? 'pending' : user.status === 'Blacklisted' ? 'blacklisted' : 'active'
											}>
											{user.status}
										</span>
									</p>
									<span className="dashboard-users-table-user-field-status-options">
										<TbDotsVertical />
									</span>
								</div>
							</li>
						))}
					</ul>

					<DashboardTablePagination
						totalUsers={users.length}
						options={options}
						pageCount={pageCount}
						currentOption={currentOption}
						handlePageClick={handlePageClick}
						handleSelectChange={handleSelectChange}
					/>
				</>
			)}
		</>
	);
}
