import { Spinner } from '@/components/UI/loadingSpinner';

export default function Loading() {
	return (
		<section style={{ width: '100%', height: '100vh', margin: '0px auto' }}>
			<Spinner height />
		</section>
	);
}
