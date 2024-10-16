import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: `${process.env.PUBLIC_BASE_URL}/`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/dashboard/users`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/dashboard/guarantors`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/sign-up`,
		},
	];
}
