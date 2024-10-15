'use client';

import { useCallback, useEffect } from 'react';

import { USER_WITHOUT_PASSWORD_TYPE } from '@/types';

import { useGlobals } from '@/context';
import useSWR from 'swr';

export function useFetchUsers(isAuthenticated: boolean) {
	const {
		state: { users },
		dispatch,
	} = useGlobals();

	const fetcher = async (url: string) => {
		const res = await fetch(url);
		if (!res.ok) throw new Error('Failed to fetch data');
		return res.json();
	};

	// Only fetch users if `users` in state is empty and the user is authenticated
	const shouldFetch = isAuthenticated && users.length === 0;

	// Use SWR to fetch data only when `shouldFetch` is true
	const { data, error, isLoading } = useSWR<USER_WITHOUT_PASSWORD_TYPE[], Error>(shouldFetch ? '/users.json' : null, fetcher);

	// Memoized dispatch to update global state if needed
	const memoizedDispatch = useCallback(() => {
		if (isAuthenticated && data && JSON.stringify(data) !== JSON.stringify(users)) {
			dispatch({ type: 'users', payload: { users: data } });
		}
	}, [data, users, dispatch, isAuthenticated]);

	useEffect(() => {
		// Only dispatch when new data is available
		memoizedDispatch();
	}, [memoizedDispatch]);

	// Return the data, error, loading state, and the global users
	return { data, error, isLoading, users };
}
