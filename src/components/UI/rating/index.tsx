'use client';
interface StarReviewProps {
	tier: 1 | 2 | 3; // Ensures the tier is between 1 and 3
}

export function StarReview({ tier }: StarReviewProps) {
	// Create an array of the required size and fill it with true (for filled stars)
	const filledStars = Array(tier).fill(true);
	// Create an array for the remaining stars
	const emptyStars = Array(3 - tier).fill(false);

	return (
		<p style={{ display: 'flex', alignItems: 'center' }}>
			{filledStars.map((_, idx) => (
				<span
					key={`filled-${idx}`}
					style={{ color: 'gold', fontSize: '24px' }}>
					★
				</span>
			))}
			{emptyStars.map((_, idx) => (
				<span
					key={`empty-${idx}`}
					style={{ color: 'lightgray', fontSize: '24px' }}>
					★
				</span>
			))}
		</p>
	);
}
