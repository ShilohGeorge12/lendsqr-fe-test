'use client';

import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

import type { State, ReducerType, stateAction, ActiveUserType } from '../types';
// const users: State['user'][] = [
// 	{
// 		id: '1',
// 		organization: 'Lendsqr',
// 		username: 'Adedeji',
// 		email: 'adedeji@lendsqr.com',
// 		phoneNumber: '08078903721',
// 		DateJoined: 'May 15, 2020 10:00 AM',
// 		status: 'Inactive',
// 	},
// 	{
// 		id: '2',
// 		organization: 'Lendsqr',
// 		username: 'Adedeji',
// 		email: 'adedeji@lendsqr.com',
// 		phoneNumber: '08078903721',
// 		DateJoined: 'May 15, 2020 10:00 AM',
// 		status: 'Inactive',
// 	},
// 	{
// 		id: '3',
// 		organization: 'Lendsqr',
// 		username: 'Adedeji',
// 		email: 'adedeji@lendsqr.com',
// 		phoneNumber: '08078903721',
// 		DateJoined: 'May 15, 2020 10:00 AM',
// 		status: 'Blacklisted',
// 	},
// 	{
// 		id: '4',
// 		organization: 'Lendsqr',
// 		username: 'Adedeji',
// 		email: 'adedeji@lendsqr.com',
// 		phoneNumber: '08078903721',
// 		DateJoined: 'May 15, 2020 10:00 AM',
// 		status: 'Pending',
// 	},
// 	{
// 		id: '5',
// 		organization: 'Lendsqr',
// 		username: 'Adedeji',
// 		email: 'adedeji@lendsqr.com',
// 		phoneNumber: '08078903721',
// 		DateJoined: 'May 15, 2020 10:00 AM',
// 		status: 'Active',
// 	},
// 	{
// 		id: '6',
// 		organization: 'Lendsqr',
// 		username: 'Adedeji',
// 		email: 'adedeji@lendsqr.com',
// 		phoneNumber: '08078903721',
// 		DateJoined: 'May 15, 2020 10:00 AM',
// 		status: 'Blacklisted',
// 	},
// ];

const initState: State = {
	isLoggedIn: false,
	nav_menu: 'close',
	users: [],
	user: {
		_id: '',
		organization: '',
		email: '',
		token: '',
	},
};

const MyContext = createContext({
	state: initState,
	dispatch(_val: stateAction) {},
});

const reducer: ReducerType = (state, action) => {
	switch (action.type) {
		case 'users':
			return { ...state, users: action.payload.users };
		case 'user':
			return { ...state, user: action.payload.user };
		case 'isLoggedIn':
			return { ...state, isLoggedIn: action.payload.loggedIn, user: { ...state.user, email: action.payload.user.email } };
		case 'isLoggedOut':
			return { ...state, isLoggedIn: action.payload.loggedIn };
		case 'nav_menu_open':
			return { ...state, nav_menu: 'open' };
		case 'nav_menu_close':
			return { ...state, nav_menu: 'close' };
		default:
			return state;
	}
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initState);
	// const { push } = useRouter();

	// useEffect(() => {
	// 	const storedUser = localStorage.getItem('user');
	// 	if (storedUser) {
	// 		const parsedUser = JSON.parse(storedUser) as ActiveUserType;
	// 		const user = {
	// 			_id: parsedUser._id,
	// 			email: parsedUser.email,
	// 			organization: parsedUser.organization,
	// 			token: parsedUser.token,
	// 		};
	// 		dispatch({ type: 'isLoggedIn', payload: { loggedIn: true, user: user } });
	// 		push('/dashboard/users');
	// 	}
	// }, []);

	return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
};

export const useGlobals = () => useContext(MyContext);
