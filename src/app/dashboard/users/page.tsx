import { RiFilter3Line } from 'react-icons/ri';
import { TbDotsVertical } from 'react-icons/tb';

import { ActiveUser2, UserIcon1, UsersWithLoan, UsersWithSavings } from '@/components/svg/svgs3';
import { DashboardTablePagination } from '@/components/UI/Dashboard/tablePagination';

import { USER } from '@/types';

import './users-style.scss';

export default async function DashboardUser() {
	const cards = [
		{
			id: '1',
			title: 'USERS',
			numbers: '2,453',
			icon: <UserIcon1 />,
		},
		{
			id: '2',
			title: 'ACTIVE USERS',
			numbers: '2,453',
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

	const users: USER[] = [
		{
			id: '1',
			organization: 'Lendsqr',
			username: 'Adedeji',
			email: 'adedeji@lendsqr.com',
			phoneNumber: '08078903721',
			DateJoined: 'May 15, 2020 10:00 AM',
			status: 'Inactive',
		},
		{
			id: '2',
			organization: 'Lendsqr',
			username: 'Adedeji',
			email: 'adedeji@lendsqr.com',
			phoneNumber: '08078903721',
			DateJoined: 'May 15, 2020 10:00 AM',
			status: 'Inactive',
		},
		{
			id: '3',
			organization: 'Lendsqr',
			username: 'Adedeji',
			email: 'adedeji@lendsqr.com',
			phoneNumber: '08078903721',
			DateJoined: 'May 15, 2020 10:00 AM',
			status: 'Blacklisted',
		},
		{
			id: '4',
			organization: 'Lendsqr',
			username: 'Adedeji',
			email: 'adedeji@lendsqr.com',
			phoneNumber: '08078903721',
			DateJoined: 'May 15, 2020 10:00 AM',
			status: 'Pending',
		},
		{
			id: '5',
			organization: 'Lendsqr',
			username: 'Adedeji',
			email: 'adedeji@lendsqr.com',
			phoneNumber: '08078903721',
			DateJoined: 'May 15, 2020 10:00 AM',
			status: 'Active',
		},
		{
			id: '6',
			organization: 'Lendsqr',
			username: 'Adedeji',
			email: 'adedeji@lendsqr.com',
			phoneNumber: '08078903721',
			DateJoined: 'May 15, 2020 10:00 AM',
			status: 'Blacklisted',
		},
	];

	return (
		<section className="dashboard-users">
			<section className="dashboard-users-user-section">
				<h2>Users</h2>
			</section>

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
				{users.map((user) => (
					<li
						key={user.id}
						className="dashboard-users-table-user-field">
						<div className="dashboard-users-table-user-field-organization">{user.organization}</div>
						<div className="dashboard-users-table-user-field-username">{user.username}</div>
						<div className="dashboard-users-table-user-field-email">{user.email}</div>
						<div className="dashboard-users-table-user-field-phonenumber">{user.phoneNumber}</div>
						<div className="dashboard-users-table-user-field-datejoined">{user.DateJoined}</div>
						<div className="dashboard-users-table-user-field-status">
							<p className="dashboard-users-table-user-field-status-details">
								<span
									className={user.status === 'Inactive' ? 'Inactive' : user.status === 'Pending' ? 'pending' : user.status === 'Blacklisted' ? 'blacklisted' : 'active'}>
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

			<DashboardTablePagination users={users} />
		</section>
	);
}
