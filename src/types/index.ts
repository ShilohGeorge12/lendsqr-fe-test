export interface UserType {
	email: string;
	password: string;
}

// Context Types
export type stateAction =
	| { type: 'isLoggedIn'; payload: { loggedIn: true; user: { email: string } } }
	| { type: 'isLoggedOut'; payload: { loggedIn: false } }
	| { type: 'nav_menu_open' }
	| { type: 'nav_menu_close' };

export interface State {
	isLoggedIn: boolean;
	user: Omit<UserType, 'password'>;
	nav_menu: 'open' | 'close';
}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;
