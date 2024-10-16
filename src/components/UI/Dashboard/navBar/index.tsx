'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FaHome } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';

import {
    BreifCase1, ChartBar, DecisionModels, Loan, Sliders, User1, UserCog, UserFreinds
} from '@/components/svg';
import {
    Bank, CoinSolid, Galazy, Group104, IconSvg, PiggyBank, Scroll, UserCheck, UserTimes
} from '@/components/svg/svgs2';
import { Badge, ClipBoard, LogOutSvg, Tire } from '@/components/svg/svgs3';

import { useAuthContext } from '@/utils/AuthProvider';

export function NavBar() {
	const { onLogout } = useAuthContext();
	const path = usePathname();
	const customers = [
		{
			id: 'customers_1',
			icon: UserFreinds,
			href: '/dashboard/users',
			text: 'Users',
		},
		{
			id: 'customers_2',
			icon: User1,
			href: '/dashboard/guarantors',
			text: 'Guarantors',
		},
		{
			id: 'customers_3',
			icon: Loan,
			href: '/dashboard/loans',
			text: 'Loans',
		},
		{
			id: 'customers_4',
			icon: DecisionModels,
			href: '/dashboard/decision-models',
			text: 'Decision Models',
		},
		{
			id: 'customers_5',
			icon: PiggyBank,
			href: '/dashboard/savings',
			text: 'Savings',
		},
		{
			id: 'customers_6',
			icon: Group104,
			href: '/dashboard/loan-requests',
			text: 'Loan Requests',
		},
		{
			id: 'customers_7',
			icon: UserCheck,
			href: '/dashboard/whitelist',
			text: 'Whitelist',
		},
		{
			id: 'customers_8',
			icon: UserTimes,
			href: '/dashboard/karma',
			text: 'Karma',
		},
	];
	const businesses = [
		{
			id: 'businesses_1',
			icon: BreifCase1,
			href: '/dashboard/organization',
			text: 'Organization',
		},
		{
			id: 'businesses_2',
			icon: Loan,
			href: '/dashboard/loan-products',
			text: 'Loan Products',
		},
		{
			id: 'businesses_3',
			icon: Bank,
			href: '/dashboard/savings-products',
			text: 'Savings Products',
		},
		{
			id: 'businesses_4',
			icon: CoinSolid,
			href: '/dashboard/fees-and-charges',
			text: 'Fees and Charges',
		},
		{
			id: 'businesses_5',
			icon: IconSvg,
			href: '/dashboard/transactions',
			text: 'Transactions',
		},
		{
			id: 'businesses_6',
			icon: Galazy,
			href: '/dashboard/services',
			text: 'Services',
		},
		{
			id: 'businesses_7',
			icon: UserCog,
			href: '/dashboard/services-account',
			text: 'Service Account',
		},
		{
			id: 'businesses_8',
			icon: Scroll,
			href: '/dashboard/settlements',
			text: 'Settlements',
		},
		{
			id: 'businesses_9',
			icon: ChartBar,
			href: '/dashboard/reports',
			text: 'Reports',
		},
	];
	const settings = [
		{
			id: 'settings_1',
			icon: Sliders,
			href: '/dashboard/preferences',
			text: 'Preferences',
		},
		{
			id: 'settings_2',
			icon: Badge,
			href: '/dashboard/fees-and-pricing',
			text: 'Fees and Pricing',
		},
		{
			id: 'settings_3',
			icon: ClipBoard,
			href: '/dashboard/audit-logs',
			text: 'Audit Logs',
		},
	];

	const userDetailsRegex = /^\/dashboard\/users\/[a-zA-Z0-9]+$/;

	return (
		<nav>
			<section className="nav-content-1">
				<div className="nav-breifcase1">
					<BreifCase1 />
					<p>Switch Organization</p>
					<MdKeyboardArrowDown />
				</div>

				<div className="nav-home">
					<FaHome />
					<p>Dashboard</p>
				</div>
			</section>
			<section className="nav-customers">
				<p className="text">CUSTOMERS</p>

				{customers.map((customer) => (
					<Link
						key={customer.id}
						href={customer.href}
						className={path === customer.href || path.includes(customer.href) ? 'active' : ''}>
						<customer.icon />
						<p>{customer.text}</p>
					</Link>
				))}
			</section>
			<section className="nav-businesses">
				<p className="text">BUSINESSES</p>

				{businesses.map((business) => (
					<Link
						key={business.id}
						href={business.href}
						className={path === business.href ? 'active' : ''}>
						<business.icon />
						<p>{business.text}</p>
					</Link>
				))}
			</section>
			<section className="nav-settings">
				<p className="text">SETTINGS</p>

				{settings.map((setting) => (
					<Link
						key={setting.id}
						href={setting.href}
						className={path === setting.href ? 'active' : ''}>
						<setting.icon />
						<p>{setting.text}</p>
					</Link>
				))}

				<Link
					href={'/dashboard/systems-messages'}
					className={path === '/dashboard/systems-messages' ? 'active' : ''}>
					<Tire />
					<p>Systems Messages</p>
				</Link>
			</section>

			{userDetailsRegex.test(path) && (
				<section className="nav-logout">
					<button
						type="button"
						name={`log out button`}
						className={`nav-logout-btn`}
						onClick={onLogout}>
						<LogOutSvg />
						<p>Logout</p>
					</button>
				</section>
			)}
		</nav>
	);
}
