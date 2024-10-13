import { ActiveUser2, UserIcon1, UsersWithLoan, UsersWithSavings } from '@/components/svg/svgs3';
import { UserTable } from '@/components/UI/Dashboard/usertable';

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

			<UserTable />
		</section>
	);
}
