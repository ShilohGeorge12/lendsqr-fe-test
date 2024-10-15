import Image from 'next/image';


import { SignInSvg } from '@/components/svg/';
import { SignInForm } from '@/components/UI/signInForm';


import logo from '@/assets/logo.png';
import './app.scss';

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
