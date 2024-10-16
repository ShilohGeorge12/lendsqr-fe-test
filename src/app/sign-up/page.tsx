import { Metadata } from 'next';
import Image from 'next/image';

import { SignInSvg } from '@/components/svg/';

import logo from '@/assets/logo.png';
import './sign-up.scss';
import { SignUpForm } from './signUpForm';

export const metadata: Metadata = {
	title: 'Sign Up',
	description:
		'Create a new account on the Lendsqr User Dashboard management application. Sign up to manage users, access advanced features, and improve workflow. Developed using React, TypeScript, and SCSS for performance and security.',
	keywords: 'Lendsqr, sign up, create account, user dashboard, management, register, React, TypeScript, SCSS, secure registration',
};

export default async function SignUpPage() {
	return (
		<main className="sign-up">
			<section className="sign-up-nav">
				<Image
					src={logo}
					alt=""
				/>
			</section>
			<section className="sign-up-content">
				<section className="sign-up-col-1">
					<SignInSvg />
				</section>
				<SignUpForm />
			</section>
		</main>
	);
}
