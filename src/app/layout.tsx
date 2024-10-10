import type { Metadata } from 'next';
import './globals.scss';

import localFont from 'next/font/local';

const avenir = localFont({
	src: './fonts/AvenirNextLTPro-Bold.otf',
	variable: '--font-avenir-bold',
	// weight: '100 900',
	display: 'swap',
});
const avenirRegular = localFont({
	src: './fonts/AvenirNextLTPro-Regular.otf',
	variable: '--font-avenir-regular',
	// weight: '100 900',
	display: 'swap',
});
const robotoMedium = localFont({
	src: './fonts/Roboto-Medium.ttf',
	variable: '--font-roboto-medium',
	// weight: '100 900',
	display: 'swap',
});
const robotoReguler = localFont({
	src: './fonts/Roboto-Regular.ttf',
	variable: '--font-roboto-regular',
	// weight: '100 900',
	display: 'swap',
});
const workSansReguler = localFont({
	src: './fonts/WorkSans-Regular.ttf',
	variable: '--font-work-sans-regular',
	// weight: '100 900',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'lendsqr-fe-test',
	description: 'This project is a technical assessment for the Frontend Engineer role at Lendsqr, built using React, TypeScript, and SCSS.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${avenir.variable} ${avenirRegular.variable} ${robotoMedium} ${robotoReguler}`}>{children}</body>
		</html>
	);
}
