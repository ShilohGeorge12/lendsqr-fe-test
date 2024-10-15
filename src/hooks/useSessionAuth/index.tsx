'use client';

import { useEffect, useState, useTransition } from 'react';

import { ActiveUserType } from '@/types';

import { useGlobals } from '@/context';

export function useSessionAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isAuthPending, startTransition] = useTransition();
	const { dispatch } = useGlobals();

	useEffect(() => {
		const storedUser = sessionStorage.getItem('user');
		if (storedUser) {
			startTransition(() => {
				const parsedUser = JSON.parse(storedUser) as ActiveUserType;

				if (parsedUser.token !== '') {
					const user = {
						_id: parsedUser._id,
						email: parsedUser.email,
						organization: parsedUser.organization,
						token: parsedUser.token,
					};

					dispatch({ type: 'isLoggedIn', payload: { loggedIn: true, user: user } });
					// push('/dashboard/users');
					setIsAuthenticated(true);
				}
			});
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const onLogout = (): void => {
		startTransition(() => {
			const storedUser = sessionStorage.getItem('user');
			if (!storedUser) return;
			const parsedUser = JSON.parse(storedUser) as ActiveUserType;
			parsedUser.token = '';
			sessionStorage.setItem('user', JSON.stringify(parsedUser));
			setIsAuthenticated(false);
		});
	};

	const onLogin = ({ email, password }: Pick<ActiveUserType, 'email' | 'password'>): void => {
		startTransition(() => {
			const storedUser = sessionStorage.getItem('user');
			if (!storedUser) return;
			const parsedUser = JSON.parse(storedUser) as ActiveUserType;

			if (parsedUser.email === email && parsedUser.password === password) {
				parsedUser.token = 'auth_verified';
				sessionStorage.setItem('user', JSON.stringify(parsedUser));
				setIsAuthenticated(true);
			}
		});
	};

	return { isAuthenticated, isAuthPending, onLogin, onLogout };
}
