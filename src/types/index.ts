export interface UserType {
	_id: string;
	email: string;
	password: string;
	organization: string;
	username: string;
	phoneNumber: string;
	DateJoined: string;
	status: 'Active' | 'Inactive' | 'Blacklisted' | 'Pending';
}

export type USER_WITHOUT_PASSWORD_TYPE = Omit<UserType, 'password'>;

// Context Types
export type stateAction =
	| { type: 'users'; payload: { users: Omit<UserType, 'password'>[] } }
	| { type: 'isLoggedIn'; payload: { loggedIn: true; user: { email: string } } }
	| { type: 'isLoggedOut'; payload: { loggedIn: false } }
	| { type: 'nav_menu_open' }
	| { type: 'nav_menu_close' };

export interface State {
	isLoggedIn: boolean;
	user: Omit<UserType, 'password'>;
	users: Omit<UserType, 'password'>[];
	nav_menu: 'open' | 'close';
}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;
