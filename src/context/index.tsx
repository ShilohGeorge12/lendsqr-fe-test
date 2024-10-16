'use client';

import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

import type { State, ReducerType, stateAction, ActiveUserType } from '../types';

const initState: State = {
	isLoggedIn: false,
	nav_menu: 'close',
	users: [],
	guarantors: [],
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
		case 'update_users':
			return { ...state, users: action.payload.users };
		case 'guarantors':
			return { ...state, guarantors: action.payload.guarantors };
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
	return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
};

export const useGlobals = () => useContext(MyContext);
