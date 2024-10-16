'use client';

import { redirect } from 'next/navigation';

import { useEffect, useMemo, useState } from 'react';
import { RiFilter3Line } from 'react-icons/ri';
import { TbDotsVertical } from 'react-icons/tb';

import { ActiveUser2, UserIcon1, UsersWithLoan, UsersWithSavings } from '@/components/svg/svgs3';
import { DashboardTablePagination } from '@/components/UI/Dashboard/tablePagination';
import { Spinner } from '@/components/UI/loadingSpinner';
import { useFetchUsers } from '@/hooks/useFetchUsers';
import { usePagination } from '@/hooks/usePagination';

import { useAuthContext } from '@/utils/AuthProvider';

export function GuarantorsTable() {
	const {
		state: { isAuthenticated },
		isAuthPending,
	} = useAuthContext();

	useEffect(() => {
		if (!isAuthenticated && !isAuthPending) {
			redirect('/');
		}
	}, [isAuthenticated, isAuthPending]);

	const { error, guarantors, isLoading } = useFetchUsers({ isAuthenticated, dataType: 'guarantors' });

	const [filters, setFilters] = useState({
		email: { value: '' },
		firstname: { value: '' },
		lastname: { value: '' },
		phoneNumber: { value: '' },
		relationship: { value: '' },
	});

	const handleFilterChange = (field: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[field]: { value },
		}));
	};

	const resetFilters = () => {
		setFilters({
			firstname: { value: '' },
			lastname: { value: '' },
			email: { value: '' },
			phoneNumber: { value: '' },
			relationship: { value: '' },
		});
	};

	const filteredGuarantors = useMemo(() => {
		return guarantors
			? guarantors.filter((guarantor) => {
					return (
						(filters.firstname.value ? guarantor.fullname.lastname.toLowerCase().includes(filters.firstname.value.toLowerCase()) : true) &&
						(filters.lastname.value ? guarantor.fullname.lastname.toLowerCase().includes(filters.lastname.value.toLowerCase()) : true) &&
						(filters.email.value ? guarantor.email.toLowerCase().includes(filters.email.value.toLowerCase()) : true) &&
						(filters.phoneNumber.value ? guarantor.phoneNumber.includes(filters.phoneNumber.value) : true) &&
						(filters.relationship.value ? guarantor.relationship.includes(filters.relationship.value) : true)
					);
			  })
			: [];
	}, [guarantors, filters]);

	const { options, currentOption, handleSelectChange, pageCount, handlePageClick, itemOffset, itemsPerPage } = usePagination({
		filteredUsers: filteredGuarantors,
		itemsPerPageOptions: [15, 18, 20],
		indexOfFirstItemPerPage: 0,
	});

	// Modal state
	const [showModal, setShowModal] = useState(false);

	const cards = [
		{
			id: '1',
			title: 'GUARANTORS',
			numbers: guarantors ? guarantors.length : 0,
			icon: <UserIcon1 />,
		},
		{
			id: '2',
			title: 'ACTIVE GUARANTORS',
			numbers: `1`,
			icon: <ActiveUser2 />,
		},
		{
			id: '3',
			title: 'GUARANTORS WITH LOANS',
			numbers: '1',
			icon: <UsersWithLoan />,
		},
		{
			id: '4',
			title: 'GUARANTORS WITH SAVINGS',
			numbers: '24',
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

				<table className="dashboard-guarantors-table">
					<thead>
						<tr>
							<td onClick={() => setShowModal((prev) => !prev)}>
								FIRSTNAME
								<RiFilter3Line />
							</td>

							<td>
								LASTNAME
								<RiFilter3Line />
							</td>

							<td>
								EMAIL
								<RiFilter3Line />
							</td>
							<td>
								PHONE NUMBER
								<RiFilter3Line />
							</td>
						</tr>
					</thead>
					<tbody>
						{filteredGuarantors &&
							filteredGuarantors.length > 0 &&
							filteredGuarantors.slice(itemOffset, itemOffset + itemsPerPage).map((guarantor) => (
								<tr
									key={guarantor._id}
									className="dashboard-users-table-user-field">
									<td>{guarantor.fullname.firstname}</td>
									<td>{guarantor.fullname.lastname}</td>
									<td>{guarantor.email}</td>
									<td>{guarantor.phoneNumber}</td>
									<td>
										<TbDotsVertical />
									</td>
								</tr>
							))}
					</tbody>
					<tfoot>
						{guarantors && !isLoading && filteredGuarantors && filteredGuarantors.length === 0 && (
							<tr className="dashboard-users-not-found">
								<td
									scope="row"
									colSpan={4}>
									No Users were found.
								</td>
							</tr>
						)}
						{isLoading && (
							<tr className="dashboard-users-not-found">
								<td
									scope="row"
									colSpan={4}>
									<Spinner height />
								</td>
							</tr>
						)}
					</tfoot>
				</table>

				{showModal && (
					<section className="filtering-modal">
						<div className="filtering-modal-organization">
							<label htmlFor="organization">First Name</label>
							<input
								type="search"
								id="organization"
								value={filters.firstname.value}
								onChange={(e) => handleFilterChange('organization', e.target.value)}
								placeholder="Search...."
							/>
						</div>
						<div className="filtering-modal-username">
							<label htmlFor="username">Last Name</label>
							<input
								type="search"
								id="username"
								value={filters.lastname.value}
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

				{filteredGuarantors && filteredGuarantors.length > 0 && (
					<DashboardTablePagination
						totalUsers={guarantors ? guarantors.length : 0}
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
