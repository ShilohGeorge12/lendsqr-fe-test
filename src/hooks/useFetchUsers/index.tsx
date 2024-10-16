'use client';

import { useCallback, useEffect } from 'react';

import { GuarantorsType, isGuarantorsArray, isUsersArray, UsersType } from '@/types'; // Assuming you have a GuarantorType in your types file

import { useGlobals } from '@/context';
import useSWR from 'swr';

interface useFetchDataProps {
	isAuthenticated: boolean;
	dataType: 'users' | 'guarantors';
}

export function useFetchUsers({ isAuthenticated, dataType }: useFetchDataProps): {
	error?: Error;
	isLoading: boolean;
	users?: UsersType[];
	guarantors?: GuarantorsType[];
} {
	const {
		state: { users, guarantors },
		dispatch,
	} = useGlobals();

	// Fetcher function to fetch data from a given URL
	const fetcher = async (url: string) => {
		const res = await fetch(url);
		if (!res.ok) throw new Error('Failed to fetch data');
		return res.json();
	};

	// Conditional fetching based on the data type
	const shouldFetch = isAuthenticated && (dataType === 'users' ? users.length === 0 : guarantors.length === 0);

	// Determine the URL based on the dataType parameter
	const url = dataType === 'users' ? '/users.json' : '/guarantors.json';

	// Use SWR to fetch data when `shouldFetch` is true
	const { data, error, isLoading } = useSWR<(UsersType | GuarantorsType)[], Error>(shouldFetch ? url : null, fetcher);

	// Memoized dispatch to update global state when needed
	const memoizedDispatch = useCallback(() => {
		if (isAuthenticated) {
			if (dataType === 'users' && data && JSON.stringify(data) !== JSON.stringify(users)) {
				if (isUsersArray(data)) {
					dispatch({ type: 'users', payload: { users: data } });
				}
			} else if (dataType === 'guarantors' && data && JSON.stringify(data) !== JSON.stringify(guarantors)) {
				if (isGuarantorsArray(data)) {
					dispatch({ type: 'guarantors', payload: { guarantors: data } });
				}
			}
		}
	}, [data, users, guarantors, dispatch, isAuthenticated, dataType]);

	useEffect(() => {
		// Only dispatch when new data is available
		memoizedDispatch();
	}, [memoizedDispatch]);

	// Return the fetched data, error, loading state, and the relevant global data (either users or guarantors)
	// [dataType]: dataType === 'users' ? users : guarantors
	return {
		// [dataType]: dataType === 'users' ? users : guarantors,
		users: dataType === 'users' ? users : undefined,
		guarantors: dataType === 'users' ? undefined : guarantors,
		error,
		isLoading,
	};
}

// 'use client';

// import { useCallback, useEffect } from 'react';

// import { USER_WITHOUT_PASSWORD_TYPE } from '@/types';

// import { useGlobals } from '@/context';
// import useSWR from 'swr';

// export function useFetchUsers(isAuthenticated: boolean) {
// 	const {
// 		state: { users },
// 		dispatch,
// 	} = useGlobals();

// 	const fetcher = async (url: string) => {
// 		const res = await fetch(url);
// 		if (!res.ok) throw new Error('Failed to fetch data');
// 		return res.json();
// 	};

// 	// Only fetch users if `users` in state is empty and the user is authenticated
// 	const shouldFetch = isAuthenticated && users.length === 0;

// 	// Use SWR to fetch data only when `shouldFetch` is true
// 	const { data, error, isLoading } = useSWR<USER_WITHOUT_PASSWORD_TYPE[], Error>(shouldFetch ? '/users.json' : null, fetcher);

// 	// Memoized dispatch to update global state if needed
// 	const memoizedDispatch = useCallback(() => {
// 		if (isAuthenticated && data && JSON.stringify(data) !== JSON.stringify(users)) {
// 			dispatch({ type: 'users', payload: { users: data } });
// 		}
// 	}, [data, users, dispatch, isAuthenticated]);

// 	useEffect(() => {
// 		// Only dispatch when new data is available
// 		memoizedDispatch();
// 	}, [memoizedDispatch]);

// 	// Return the data, error, loading state, and the global users
// 	return { data, error, isLoading, users };
// }
