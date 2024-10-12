'use client';

import Image from 'next/image';
import Link from 'next/link';

import error from '@/assets/error.png';
import { motion } from 'framer-motion';
import '../../scss/error.scss';

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<motion.section
			className="dashboard-error"
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<section className="dashboard-error-contanier">
				<Image
					src={error}
					title="error Something went wrong"
					alt="error Something went wrong"
				/>

				<section className="dashboard-error-flexbox">
					<hr />
					<section className="dashboard-error-textbox">
						<p>Something Went Wrong! </p>
						<button onClick={() => reset()}>Try again</button>
						<Link href={'/dashboard/users'}>Back to Dashboard</Link>
					</section>
				</section>
			</section>
		</motion.section>
	);
}
