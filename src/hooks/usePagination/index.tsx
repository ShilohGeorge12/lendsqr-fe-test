'use client';
import { useMemo, useState } from 'react';

import { USER_WITHOUT_PASSWORD_TYPE } from '@/types';

interface usePaginationProps {
	filteredUsers: USER_WITHOUT_PASSWORD_TYPE[];
	itemsPerPageOptions?: number[];
	indexOfFirstItemPerPage?: number;
}

export function usePagination({ filteredUsers, itemsPerPageOptions = [15, 18, 20], indexOfFirstItemPerPage = 1 }: usePaginationProps) {
	const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageOptions[0]);
	const [itemOffset, setItemOffset] = useState(0);

	const options = itemsPerPageOptions.map((value) => ({
		value: `${value}`,
		label: `${value}`,
	}));
	const [currentOption, setCurrentOption] = useState<{ value: string; label: string } | null>(options[indexOfFirstItemPerPage]);

	const handleSelectChange = (option: { value: string; label: string } | null) => {
		if (option && currentOption?.value !== option.value) {
			const selectedValue = parseInt(option.value);
			setCurrentOption(option);
			setItemsPerPage(selectedValue);
		}
	};

	const pageCount = useMemo(() => {
		return Math.ceil(filteredUsers.length / itemsPerPage);
	}, [filteredUsers.length, itemsPerPage]);

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = event.selected * itemsPerPage;
		setItemOffset(newOffset);
	};

	return { options, currentOption, pageCount, itemOffset, itemsPerPage, handleSelectChange, handlePageClick };
}
