'use client';

import ReactPaginate from 'react-paginate';
import Select, { GroupBase, StylesConfig } from 'react-select';

import { ArrowLeft, ArrowRight } from '@/components/svg/svgs3';

interface DashboardTablePaginationProps {
	options: { value: string; label: string }[];
	currentOption: { value: string; label: string } | null;
	handleSelectChange: (
		option: {
			value: string;
			label: string;
		} | null
	) => void;
	handlePageClick: (event: { selected: number }) => void;
	pageCount: number;
	totalUsers: number;
}

export function DashboardTablePagination({ currentOption, pageCount, options, totalUsers, handlePageClick, handleSelectChange }: DashboardTablePaginationProps) {
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
				<p>Out of {totalUsers}</p>
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
