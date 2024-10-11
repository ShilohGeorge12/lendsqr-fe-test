import './app.scss';

import Image from 'next/image';

import logo from '@/assets/logo.png';
import { SignInSvg } from '@/components/svg/';
import { SignUpForm } from '@/components/UI/signUpForm';

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
				<SignUpForm />
			</section>
		</main>
	);
}
