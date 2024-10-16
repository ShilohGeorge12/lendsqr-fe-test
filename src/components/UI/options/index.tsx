'use client';

import { ReactNode, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { TbDotsVertical } from 'react-icons/tb';

export function MenuOptions({ children }: { children: ReactNode }) {
	const [showOptions, setShowOptions] = useState<boolean>(false);

	return (
		<>
			<span
				className="options"
				onClick={() => setShowOptions((prev) => !prev)}>
				<TbDotsVertical />
			</span>
			{showOptions && (
				<section className="options-container">
					{children}
					<button
						type="button"
						name={``}
						className="close"
						onClick={() => {
							setShowOptions(false);
						}}>
						<AiOutlineCloseCircle />
						Close
					</button>
				</section>
			)}
		</>
	);
}
