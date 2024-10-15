export interface ActiveUserType {
	_id: string;
	email: string;
	organization: string;
	password: string;
	token: string;
}

export interface UsersType {
	_id: string;
	email: string;
	password: string;
	organization: string;
	username: string;
	phoneNumber: string;
	DateJoined: string;
	status: 'Active' | 'Inactive' | 'Blacklisted' | 'Pending';
}

export type USER_WITHOUT_PASSWORD_TYPE = Omit<UsersType, 'password'>;

// Context Types
export type stateAction =
	| { type: 'users'; payload: { users: Omit<UsersType, 'password'>[] } }
	| { type: 'user'; payload: { user: Omit<ActiveUserType, 'password'> } }
	| { type: 'isLoggedIn'; payload: { loggedIn: true; user: Omit<ActiveUserType, 'password'> } }
	| { type: 'isLoggedOut'; payload: { loggedIn: false } }
	| { type: 'nav_menu_open' }
	| { type: 'nav_menu_close' };

export interface State {
	isLoggedIn: boolean;
	user: Omit<ActiveUserType, 'password'>;
	users: Omit<UsersType, 'password'>[];
	nav_menu: 'open' | 'close';
}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;
