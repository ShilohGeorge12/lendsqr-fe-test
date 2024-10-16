import { Metadata } from 'next';
import Image from 'next/image';

import { SignInSvg } from '@/components/svg/';
import { SignInForm } from '@/components/UI/signInForm';

import logo from '@/assets/logo.png';
import './app.scss';

export const metadata: Metadata = {
	title: 'Sign In ',
	description:
		'Sign in to the Lendsqr User Dashboard management application. Manage user data efficiently with a secure login process. Built using React, TypeScript, and SCSS for a seamless user experience.',
	keywords: 'Lendsqr, sign in, login, user dashboard, management, React, TypeScript, SCSS, secure login',
};

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
				<SignInForm />
			</section>
		</main>
	);
}
