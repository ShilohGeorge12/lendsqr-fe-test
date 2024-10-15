'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import { ChangeEvent, FormEvent, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';


import { useAuthContext } from '@/utils/AuthProvider';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(15),
	confirm_password: z.string().min(6).max(15),
});

export function SignUpForm() {
	const {
		state: { isAuthenticated },
		isAuthPending,
		onSignUp,
	} = useAuthContext();
	const initState: z.infer<typeof schema> = {
		email: '',
		password: '',
		confirm_password: '',
	};
	const { push } = useRouter();
	const [formData, setFormData] = useState(initState);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [viewPassword, setViewPassword] = useState(false);
	const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);

		if (!schema.safeParse(formData).success) {
			setErrorMessage(['fill in a correct email and password', 'password must be between 6-15 characthers']);
			return;
		}

		if (formData.confirm_password !== formData.password) {
			setErrorMessage(['Password and Confirm Password does not match, Please review']);
			return;
		}

		// const fakeUser = {
		// 	token: '',
		// 	password: 'sg@133',
		// 	email: 'sg@gmail.com',
		// 	organization: 'Lendsqr',
		// 	_id: 'testing_id',
		// };
		const error = onSignUp({
			email: formData.email,
			password: formData.password,
		});

		if (error) {
			setErrorMessage(['A User Already Exit please delete user Before Signing up']);
			return;
		}
		setFormData(initState);
		push('/');
	};

	return (
		<form
			onSubmit={onSubmit}
			className="sign-up-col-2">
			<div className="sign-up-col-2-text">
				<h1>Welcome!</h1>
				<p>Enter details to Sign Up.</p>
			</div>
			<div className="sign-up-col-2-form">
				<input
					required
					id="email"
					type="email"
					name="email"
					inputMode="email"
					placeholder="Email"
					value={formData.email}
					onChange={onChange}
					disabled={isAuthPending}
				/>

				<div className="sign-up-col-2-password-input">
					<input
						required
						id="password"
						name="password"
						inputMode="text"
						onChange={onChange}
						disabled={isAuthPending}
						placeholder="Password"
						value={formData.password}
						type={viewPassword ? 'text' : 'password'}
					/>

					<button
						type="button"
						name={`show password`}
						className={``}
						onClick={() => setViewPassword((prev) => !prev)}>
						{viewPassword ? 'Show' : 'No Show'}
					</button>
				</div>

				<div className="sign-up-col-2-password-input">
					<input
						required
						id="password"
						name="confirm_password"
						inputMode="text"
						onChange={onChange}
						disabled={isAuthPending}
						placeholder="Password"
						value={formData.confirm_password}
						type={viewConfirmPassword ? 'text' : 'password'}
					/>

					<button
						type="button"
						name={`show password`}
						className={``}
						onClick={() => setViewConfirmPassword((prev) => !prev)}>
						{viewConfirmPassword ? 'Show' : 'No Show'}
					</button>
				</div>

				{/* <Link
					className="sign-up-col-2-link"
					href={'/'}>
					FORGOT PASSWORD?
				</Link> */}

				<button
					type="submit"
					name={`submit sign up details`}
					disabled={isAuthPending}>
					{isAuthPending && (
						<span className="text-2xl">
							<FaSpinner className="animate-btn" />
						</span>
					)}
					LOG IN
				</button>

				{errorMessage.length > 0 && (
					<ul className="error-msg w-[90%] py-1 flex flex-col items-center justify-evenly gap-3 mx-auto border border-red-600">
						{errorMessage.map((error) => (
							<li
								key={error + ' message'}
								className="font-medium "
								style={{ listStyleType: 'none' }}>
								{error}
							</li>
						))}
					</ul>
				)}
			</div>
		</form>
	);
}
