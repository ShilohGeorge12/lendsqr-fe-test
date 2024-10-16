'use client';
import { createContext, ReactNode, useContext, useEffect, useReducer, useTransition } from 'react';

import { ActiveUserType } from '@/types';

// Types for actions in the reducer
type AuthState = {
	isAuthenticated: boolean;
	user: Omit<ActiveUserType, 'password'>;
};

// Initial state for authentication
const initAuthState: AuthState = {
	isAuthenticated: false,
	user: {
		_id: '',
		email: '',
		organization: '',
		token: '',
	}, // Stores the authenticated user data
};

type AuthAction = { type: 'LOGIN'; payload: ActiveUserType } | { type: 'LOGOUT' };

// Auth reducer to manage login/logout actions
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return { isAuthenticated: true, user: action.payload };
		case 'LOGOUT':
			return { isAuthenticated: false, user: initAuthState.user };
		default:
			return state;
	}
};

// Create AuthContext
const AuthContext = createContext<{
	state: AuthState;
	isAuthPending: boolean;
	onLogin: ({ email, password }: { email: string; password: string }) => void | string;
	onSignUp: ({ email, password }: { email: string; password: string }) => void | string;
	onLogout: () => void;
}>({
	state: initAuthState,
	isAuthPending: false,
	onLogin: () => {},
	onLogout: () => {},
	onSignUp: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide the context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initAuthState);
	const [isAuthPending, startTransition] = useTransition();

	// Function to handle user login
	const onLogin = ({ email, password }: Pick<ActiveUserType, 'email' | 'password'>) => {
		const storedUser = sessionStorage.getItem('user');
		if (!storedUser) return;
		const parsedUser = JSON.parse(storedUser) as ActiveUserType;

		if (parsedUser.email !== email || parsedUser.password !== password) {
			return 'Invalid login Credentials';
		}

		startTransition(() => {
			if (parsedUser.email === email && parsedUser.password === password) {
				parsedUser.token = 'auth_verified';
				sessionStorage.setItem('user', JSON.stringify(parsedUser));
				dispatch({ type: 'LOGIN', payload: parsedUser });
				return;
			}
		});
	};

	// Function to handle user sign up
	const onSignUp = ({ email, password }: Pick<ActiveUserType, 'email' | 'password'>) => {
		const storedUser = sessionStorage.getItem('user');
		if (storedUser) return 'A user Already Exists';
		startTransition(() => {
			const createUser = {
				_id: 'Lendsqr_3',
				email: '',
				organization: 'Lendsqr',
				password: '',
				token: '',
			};
			createUser.email = email;
			createUser.password = password;
			sessionStorage.setItem('user', JSON.stringify(createUser));
		});
	};

	// Function to handle user logout
	const onLogout = (): void => {
		startTransition(() => {
			const storedUser = sessionStorage.getItem('user');
			if (!storedUser) return;

			const parsedUser = JSON.parse(storedUser) as ActiveUserType;
			parsedUser.token = '';
			sessionStorage.setItem('user', JSON.stringify(parsedUser));
			dispatch({ type: 'LOGOUT' });
		});
	};

	// Check sessionStorage for authentication on mount
	useEffect(() => {
		const storedUser = sessionStorage.getItem('user');
		if (storedUser) {
			startTransition(() => {
				const parsedUser = JSON.parse(storedUser) as ActiveUserType;
				if (parsedUser.token !== '') {
					dispatch({ type: 'LOGIN', payload: parsedUser });
				}
			});
		}
	}, []);

	// Provide the state and actions to the component tree
	return <AuthContext.Provider value={{ state, isAuthPending, onLogin, onLogout, onSignUp }}>{children}</AuthContext.Provider>;
};
