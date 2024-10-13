export interface UserType {
	email: string;
	password: string;
}

export type USER = {
	id: string;
	organization: string;
	username: string;
	email: string;
	phoneNumber: string;
	DateJoined: string;
	status: 'Active' | 'Inactive' | 'Blacklisted' | 'Pending';
};

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
