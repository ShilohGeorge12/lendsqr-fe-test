import { Spinner } from '@/components/UI/loadingSpinner';

import '../../scss/loading.scss';

export default function Loading() {
	return (
		<section className="dashboard-loading-spinner">
			<Spinner height />
		</section>
	);
}
