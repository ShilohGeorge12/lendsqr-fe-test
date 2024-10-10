import './app.scss';

import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/logo.png';
import { SignInSvg } from '@/components/svg/';

export default function Home() {
	return (
		<main className="sign-in">
			<section className="sign-in-nav">
				<Image
					src={logo}
					alt=""
				/>
			</section>
			<section className="sign-in-content">
				<section className="sign-in-col-1">
					<SignInSvg />
				</section>
				<form className="sign-in-col-2">
					<div className="sign-in-col-2-text">
						<h1>Welcome!</h1>
						<p>Enter details to login.</p>
					</div>
					<div className="sign-in-col-2-form">
						<input
							type="text"
							name="email"
							placeholder="Email"
							className=""
						/>
						<input
							type="text"
							name="password"
							placeholder="Password"
							className=""
						/>
						<Link
							className="sign-in-col-2-link"
							href={'/'}>
							FORGOT PASSWORD?
						</Link>
						<button
							type="button"
							name={``}
							className={``}>
							LOG IN
						</button>
					</div>
				</form>
			</section>
		</main>
	);
}
