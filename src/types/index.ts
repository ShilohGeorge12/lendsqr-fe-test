export interface ActiveUserType {
	_id: string;
	email: string;
	organization: string;
	password: string;
	token: string;
}

export interface GuarantorsType {
	_id: string;
	email: string;
	fullname: {
		firstname: string;
		lastname: string;
	};
	phoneNumber: string;
	relationship: 'Sister' | 'Father' | 'Pastor' | 'Mother' | 'Brother';
}

interface FullName {
	firstname: string;
	lastname: string;
}

interface Transaction {
	_id: string;
	amount: number;
	bank: 'GTBank' | 'First Bank' | 'Access Bank' | 'Zenith Bank';
	accountNumber: number;
}

export interface UsersType {
	_id: string;
	fullname: FullName;
	email: string;
	organization: string;
	username: string;
	phoneNumber: string;
	DateJoined: string;
	userTier: 1 | 2 | 3;
	maritalStatus: 'Single' | 'Married' | 'Divorced';
	children: number;
	bvn: number;
	gender: 'Male' | 'Female';
	educationlevel: 'B.Sc' | 'M.Sc' | 'Ph.D';
	employmentStatus: 'Employed' | 'Entrepreneur' | 'Unemployed' | 'Self-Employed';
	employmentSector: 'FinTech' | 'Healthcare' | 'Education' | 'Retail';
	employmentDuration: number;
	monthlyIncome: '₦200,000.00 - ₦400,000.00' | '₦400,000.00 - ₦600,000.00' | '₦600,000.00 - ₦800,000.00';
	totalLoan: number;
	loanRepayment: string;
	officeEmail: string;
	residenceType: "Parent's Apartment" | 'Own House' | 'Rented Apartment';
	twitter: string;
	facebook: string;
	instagram: string;
	savings: number;
	transaction: Transaction[];
	status: 'Active' | 'Inactive' | 'Blacklisted' | 'Pending';
}

// Type Guard for UsersType
export const isUsersType = (arg: UsersType | GuarantorsType): arg is UsersType => {
	return (arg as UsersType).organization !== undefined && (arg as UsersType).username !== undefined && (arg as UsersType).DateJoined !== undefined;
};

// Type Guard for GuarantorsType
export const isGuarantorsType = (arg: UsersType | GuarantorsType): arg is GuarantorsType => {
	return (arg as GuarantorsType).relationship !== undefined && (arg as GuarantorsType).fullname !== undefined;
};

// Type Guard for array of UsersType or GuarantorsType
export const isUsersArray = (arg: (UsersType | GuarantorsType)[]): arg is UsersType[] => {
	return arg.length > 0 && isUsersType(arg[0]);
};

export const isGuarantorsArray = (arg: (UsersType | GuarantorsType)[]): arg is GuarantorsType[] => {
	return arg.length > 0 && isGuarantorsType(arg[0]);
};

// Context Types
export type stateAction =
	| { type: 'update_users'; payload: { users: UsersType[] } }
	| { type: 'users'; payload: { users: UsersType[] } }
	| { type: 'guarantors'; payload: { guarantors: GuarantorsType[] } }
	| { type: 'user'; payload: { user: Omit<ActiveUserType, 'password'> } }
	| { type: 'isLoggedIn'; payload: { loggedIn: true; user: Omit<ActiveUserType, 'password'> } }
	| { type: 'isLoggedOut'; payload: { loggedIn: false } }
	| { type: 'nav_menu_open' }
	| { type: 'nav_menu_close' };

export interface State {
	isLoggedIn: boolean;
	user: Omit<ActiveUserType, 'password'>;
	users: UsersType[];
	guarantors: GuarantorsType[];
	nav_menu: 'open' | 'close';
}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;
