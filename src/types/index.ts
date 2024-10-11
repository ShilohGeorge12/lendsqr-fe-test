export interface UserType {
	email: string;
	password: string;
}

// Context Types
export type stateAction = { type: 'isLoggedIn'; payload: { loggedIn: true; user: { email: string } } } | { type: 'isLoggedOut'; payload: { loggedIn: false } };

export interface State {
	isLoggedIn: boolean;
	user: Omit<UserType, 'password'>;
}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;
