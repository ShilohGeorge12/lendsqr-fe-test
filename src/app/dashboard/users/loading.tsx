import { Spinner } from '@/components/UI/loadingSpinner';

export default function Loading() {
	return (
		<section style={{ width: '100%' }}>
			<Spinner height />
		</section>
	);
}
