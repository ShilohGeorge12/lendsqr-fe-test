import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ContextProvider } from '@/context';
import { env } from '@/env';
import { AuthProvider } from '@/utils/AuthProvider';
import { Toaster } from 'sonner';
import './globals.scss';

const url = env.BASE_URL;

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

const title_longName = 'lendsqr User Dashboard management application';
const title = `${title_longName}`;
const description = 'This project is a technical assessment for the Frontend Engineer role at Lendsqr, built using React, TypeScript, and SCSS.';

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title: {
		default: title,
		template: `%s | Streamline User Management Effortlessly`,
	},
	description,
	keywords: 'lendsqr, Dashboard management application, Lendsqr, user dashboard, management, React, TypeScript, SCSS',
	openGraph: {
		title,
		description,
		siteName: 'lendsqr-fe-test',
		emails: ['shilohgeorge2019@gmail.com'],
		images: ['Union.png'],
	},
	twitter: {
		card: 'summary',
		site: url,
		creator: 'Shiloh George',
		images: '/Union.png',
	},
	appleWebApp: { title, capable: true, startupImage: '/logo.png' },
	alternates: { canonical: url },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${avenir.variable} ${avenirRegular.variable} ${robotoMedium} ${robotoReguler} ${workSansReguler}`}>
				<ContextProvider>
					<AuthProvider>{children}</AuthProvider>
					<Toaster
						richColors
						position="bottom-left"
						duration={4000}
						closeButton
						theme={'light'}
					/>
				</ContextProvider>
			</body>
		</html>
	);
}
