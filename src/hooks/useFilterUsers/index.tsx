'use client';

import { useMemo, useState } from 'react';

import { USER_WITHOUT_PASSWORD_TYPE } from '@/types';

export function useFilterUsers({ users }: { users: USER_WITHOUT_PASSWORD_TYPE[] }) {
	const [filters, setFilters] = useState({
		organization: { value: '' },
		username: { value: '' },
		email: { value: '' },
		phoneNumber: { value: '' },
		status: { value: '' },
	});

	const handleFilterChange = (field: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[field]: { value },
		}));
	};

	const resetFilters = () => {
		setFilters({
			organization: { value: '' },
			username: { value: '' },
			email: { value: '' },
			phoneNumber: { value: '' },
			status: { value: '' },
		});
	};

	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			return (
				(filters.organization.value ? user.organization.toLowerCase().includes(filters.organization.value.toLowerCase()) : true) &&
				(filters.username.value ? user.username.toLowerCase().includes(filters.username.value.toLowerCase()) : true) &&
				(filters.email.value ? user.email.toLowerCase().includes(filters.email.value.toLowerCase()) : true) &&
				(filters.phoneNumber.value ? user.phoneNumber.includes(filters.phoneNumber.value) : true) &&
				(filters.status.value && filters.status.value !== 'None' ? user.status === filters.status.value : true)
			);
		});
	}, [users, filters]);

	return { filters, filteredUsers, handleFilterChange, resetFilters };
}
