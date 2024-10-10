import { MetadataRoute } from 'next';

// import { env } from '@/env';

export default function manifest(): MetadataRoute.Manifest {
	return {
		// scope: '/',
		lang: 'en',
		name: 'lendsqr-fe-test',
		description:
			'This project is a technical assessment for the Frontend Engineer role at Lendsqr, built using React, TypeScript, and SCSS. The goal of this assessment is to demonstrate my ability to implement a web application that matches the provided Figma design while adhering to industry best practices for code quality, responsiveness, and performance.',
		short_name: 'lft',
		start_url: '/',
		display: 'standalone',
		theme_color: '#ffffff',
		background_color: '#ffffff',
		icons: [
			{
				src: '/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
		protocol_handlers: [
			// {
			// 	protocol: 'web+taskdrive',
			// 	url: env.BASE_URL ? `${env.BASE_URL}/%s` : `http://localhost:${process.env.PORT ?? 4550}/%s`,
			// },
		],
	};
}
