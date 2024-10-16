import { PageClient } from './pageClient';
import './user-details-styles.scss';

export default async function UserdetailsPage({ params: { _id } }: { params: { _id: string } }) {
	return <PageClient _id={_id} />;
}
