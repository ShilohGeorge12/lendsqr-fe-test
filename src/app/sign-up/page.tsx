import Image from 'next/image';

import { SignInSvg } from '@/components/svg/';

import logo from '@/assets/logo.png';
import './sign-up.scss';
import { SignUpForm } from './signUpForm';

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
