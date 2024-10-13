'use client';

import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Select, { GroupBase, StylesConfig } from 'react-select';

import { ArrowLeft, ArrowRight } from '@/components/svg/svgs3';

import { USER } from '@/types';

interface DashboardTablePaginationProps {
	users: USER[];
}

export function DashboardTablePagination({ users }: DashboardTablePaginationProps) {
	// State for options for select
	const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
	const [currentOption, setCurrentOption] = useState<{ value: string; label: string } | null>(null);

	// itemsPerPage now linked with currentOption
	const [itemsPerPage, setItemsPerPage] = useState<number>(6);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		// Set options when component mounts
		const generatedOptions = users.map((user, index) => ({
			value: `${index + 1}`,
			label: `${index + 1}`,
		}));
		setOptions(generatedOptions);
		setCurrentOption(generatedOptions[generatedOptions.length - 1]);
	}, [users]);

	// Update itemsPerPage when select changes
	const handleSelectChange = (option: { value: string; label: string } | null) => {
		if (option) {
			setCurrentOption(option);
			setItemsPerPage(parseInt(option.value)); // Update itemsPerPage to reflect selected value
		}
	};

	useEffect(() => {
		// When itemsPerPage changes, ensure currentOption is updated
		const updatedOption = options.find((opt) => parseInt(opt.value) === itemsPerPage);
		if (updatedOption) {
			setCurrentOption(updatedOption);
		}
	}, [itemsPerPage, options]);

	// Calculate pagination
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = users.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(users.length / itemsPerPage);

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = (event.selected * itemsPerPage) % users.length;
		setItemOffset(newOffset);
	};

	// Custom styles for react-select
	const customStyles: StylesConfig<{ value: string; label: string }, false, GroupBase<{ value: string; label: string }>> = {
		option: (provided, state) => ({
			...provided,
			'fontWeight': '600',
			'backgroundColor': state.isSelected ? '#213f7d' : 'none',
			'color': state.isSelected ? 'white' : '#213f7d',
			':hover': {
				backgroundColor: state.isSelected ? '#213f7d' : '#213f7d1a',
			},
			'height': '30px',
		}),
		control: (provided) => ({
			...provided,
			border: '1px solid #213f7d',
			height: '30px',
		}),
	};

	return (
		<section className="dashboard-users-table-pagination">
			<div className="dashboard-users-items">
				<p>Showing</p>
				<Select
					id={'react-select-2-live-region'}
					menuPlacement="auto"
					classNamePrefix={'dashboard-users-items-select'}
					options={options}
					styles={customStyles}
					value={currentOption}
					onChange={handleSelectChange}
				/>
				<p>Out of {users.length}</p>
			</div>
			<ReactPaginate
				className={'pagination-ul'}
				pageClassName={'pagination-li'}
				breakLabel="...."
				nextLabel={<ArrowRight />}
				previousLabel={<ArrowLeft />}
				onPageChange={handlePageClick}
				marginPagesDisplayed={2}
				pageRangeDisplayed={1}
				pageCount={pageCount}
				renderOnZeroPageCount={null}
			/>
		</section>
	);
}
