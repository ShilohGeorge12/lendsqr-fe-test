'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { z } from 'zod';

import { useGlobals } from '@/context';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(15),
});

export function SignUpForm() {
	const { dispatch } = useGlobals();
	const initState: z.infer<typeof schema> = {
		email: '',
		password: '',
	};
	const { push } = useRouter();
	const [formData, setFormData] = useState(initState);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [viewPassword, setViewPassword] = useState(false);
	const [isPending, startTransition] = useTransition();

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

		startTransition(async () => {
			dispatch({ type: 'isLoggedIn', payload: { loggedIn: true, user: { email: formData.email } } });
			setFormData(initState);
			push('/dashboard/users');
		});
	};

	return (
		<form
			onSubmit={onSubmit}
			className="sign-in-col-2">
			<div className="sign-in-col-2-text">
				<h1>Welcome!</h1>
				<p>Enter details to login.</p>
			</div>
			<div className="sign-in-col-2-form">
				<input
					required
					id="email"
					type="email"
					name="email"
					inputMode="email"
					placeholder="Email"
					value={formData.email}
					onChange={onChange}
					disabled={isPending}
				/>

				<div className="sign-in-col-2-password-input">
					<input
						required
						id="password"
						name="password"
						inputMode="text"
						onChange={onChange}
						disabled={isPending}
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
				<Link
					className="sign-in-col-2-link"
					href={'/'}>
					FORGOT PASSWORD?
				</Link>
				<button
					type="submit"
					name={`submit sign in details`}
					disabled={isPending}>
					{isPending && (
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
								className="font-medium ">
								{error}
							</li>
						))}
					</ul>
				)}
			</div>
		</form>
	);
}
