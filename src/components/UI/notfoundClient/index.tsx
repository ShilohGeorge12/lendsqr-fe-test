'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import logo from '@/assets/logo.png';
import notFoundImage from '@/assets/notFound.png';
import { motion } from 'framer-motion';
import { NavBar } from '../Dashboard/navBar';

export function NotFoundClient({ children }: Readonly<{ children: React.ReactNode }>) {
	const path = usePathname();
	return (
		<>
			{path.includes('dashboard') && (
				<>
					{children}
					<main className={`dashboard`}>
						<NavBar />
						<motion.section
							className={`dashboard-notfound`}
							initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
							animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
							exit={{ opacity: 0, translateZ: -100 }}
							transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
							<section className="dashboard-notfound-container">
								<Image
									src={notFoundImage}
									loading="eager"
									alt="not-found Image"
									title="not-found Image"
									className={`dashboard-notfound-image-dashboard-user`}
								/>

								<div className="dashboard-notfound-flexbox">
									<hr />
									<div className="dashboard-notfound-textbox">
										<p>The Page you are looking for was Not Found</p>
										<Link href={'/dashboard/users'}>Back To Dashboard</Link>
									</div>
								</div>
							</section>
						</motion.section>
					</main>
				</>
			)}

			{!path.includes('dashboard') && (
				<motion.section
					initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
					animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
					exit={{ opacity: 0, translateZ: -100 }}
					transition={{ type: 'spring', damping: 10, stiffness: 100 }}
					className="notfound-main-container">
					<section className="notfound-logo">
						<Image
							src={logo}
							alt="logo"
						/>
					</section>

					<section className="dashboard-notfound-container">
						<Image
							src={notFoundImage}
							loading="eager"
							alt="not-found Image"
							title="no-found Image"
							className={`dashboard-notfound-image`}
						/>

						<div className="dashboard-notfound-flexbox">
							<hr />
							<div className="dashboard-notfound-textbox">
								<p>The Page you are looking for was Not Found</p>
								<Link href={'/'}>Back To Home</Link>
							</div>
						</div>
					</section>
				</motion.section>
			)}
		</>
	);
}
