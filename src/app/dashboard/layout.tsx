import './style.scss';

import Image from 'next/image';
import Link from 'next/link';
import { CiBellOn } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';

import image from '@/assets/image_4.png';
import logo from '@/assets/logo.png';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<header className="header">
				<section className="header-logo">
					<Image
						src={logo}
						alt=""
					/>
				</section>

				<section className="header-search">
					<div className="">
						<input type="text" />
						<span className="">
							<FaSearch />
						</span>
					</div>
				</section>

				<section className="header-profile">
					<Link href={'/dashboard'}>Docs</Link>
					<CiBellOn className="header-profile-bell" />
					<Image
						src={image}
						alt="profile image"
					/>
					<div className="">
						Adedeji
						<MdArrowDropDown className="header-profile-down-arrow" />
					</div>
				</section>
			</header>
			{children}
		</>
	);
}
