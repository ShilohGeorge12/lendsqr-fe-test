'use client';

import { useEffect, useState } from 'react';

import { GuarantorsType } from '@/types';

import { useGlobals } from '@/context';
import { toast } from 'sonner';

export function PageClient({ _id }: { _id: string }) {
	const {
		state: { users },
	} = useGlobals();
	const user = users.find((user) => user._id === _id);
	const [guarantors, setGuarantors] = useState<GuarantorsType[]>([]);

	useEffect(() => {
		const fetchUserGuarntors = async () => {
			const req = await fetch('/user-guarantors.json', {
				cache: 'force-cache',
			});

			const res = (await req.json()) as unknown as typeof guarantors;
			setGuarantors(res);
		};
		fetchUserGuarntors().catch(() => {
			toast.error(`An Error Occured while fetching User ${user?.fullname.firstname} Guarantors.`);
		});
	}, []);

	return (
		<section className="dashboard-users-details-general-details">
			{user && (
				<>
					<section className="dashboard-users-details-general-details-personal-info">
						<h3>Personal Information</h3>
						<div>
							<p>
								<span>FULL NAME</span>
								<span>
									{user.fullname.firstname} {user.fullname.lastname}
								</span>
							</p>
							<p>
								<span>PHONE NUMBER</span>
								<span>{user.phoneNumber}</span>
							</p>
							<p>
								<span>EMAIL ADDRESS</span>
								<span>{user.email}</span>
							</p>
							<p>
								<span>BVN</span>
								<span>{user.bvn}</span>
							</p>
							<p>
								<span>GENDER</span>
								<span>{user.gender}</span>
							</p>
							<p>
								<span>MARITAL STATUS</span>
								<span>{user.maritalStatus}</span>
							</p>
							<p>
								<span>CHILDREN</span>
								<span>{user.children === 0 ? 'None' : user.children}</span>
							</p>
							<p>
								<span>TYPE OF RESIDENCE</span>
								<span>{user.residenceType}</span>
							</p>
						</div>
					</section>
					<section className="dashboard-users-details-general-details-education-employment">
						<h3> Education and Employment</h3>
						<div>
							<p>
								<span>LEVEL OF EDUCATION</span>
								<span>{user.educationlevel}</span>
							</p>
							<p>
								<span>EMPLOYMENT STATUS</span>
								<span>{user.employmentStatus}</span>
							</p>
							<p>
								<span>SECTOR OF EMPLOYMENT</span>
								<span>{user.employmentSector}</span>
							</p>
							<p>
								<span>DURATION OF EMPLOYMENT</span>
								<span>{user.employmentDuration}</span>
							</p>
							<p>
								<span>OFFICE EMAIL</span>
								<span>{user.officeEmail}</span>
							</p>
							<p>
								<span>MONTHLY INCOME</span>
								<span>
									{user.monthlyIncome === '₦200,000.00 - ₦400,000.00'
										? '₦200,000.00'
										: user.monthlyIncome === '₦400,000.00 - ₦600,000.00'
										? '₦400,000.00'
										: '₦600,000.00'}
								</span>
							</p>
							<p>
								<span>LOAN REPAYMENT</span>
								<span>{user.loanRepayment}</span>
							</p>
						</div>
					</section>
					<section className="dashboard-users-details-general-details-personal-info">
						<h3>SOCIALS</h3>
						<div>
							<p>
								<span>TWITTER</span>
								<span>{user.twitter}</span>
							</p>
							<p>
								<span>FACEBOOK</span>
								<span>{user.facebook}</span>
							</p>
							<p>
								<span>INSTAGRAM</span>
								<span>{user.instagram}</span>
							</p>
						</div>
					</section>
					<section className="dashboard-users-details-general-details-guarantor">
						<h3>GUARANTOR</h3>
						{guarantors.length > 0 &&
							guarantors.map((guarantor) => (
								<div key={guarantor._id}>
									<p>
										<span>FULL NAME</span>
										<span>
											{guarantor.fullname.firstname} {guarantor.fullname.lastname}
										</span>
									</p>

									<p>
										<span>PHONE NUMBER</span>
										<span>{guarantor.phoneNumber}</span>
									</p>
									<p>
										<span>EMAIL ADDRESS</span>
										<span>{guarantor.email}</span>
									</p>
									<p>
										<span>RELATIONSHIP</span>
										<span>{guarantor.relationship}</span>
									</p>
								</div>
							))}
					</section>
				</>
			)}

			{!user && <section className="dashboard-users-details-general-details-not-found">User Not Found</section>}
		</section>
	);
}
