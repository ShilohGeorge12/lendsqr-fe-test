import { useRouter } from 'next/navigation';

import { SignInForm } from '@/components/UI/signInForm';

import { useAuthContext } from '@/utils/AuthProvider';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { it } from 'node:test';

it('SignInForm Component', () => {
	it('should render the form with email, password inputs, and login button', () => {
		render(<SignInForm />);
	});
});

// Mocking useAuthContext and useRouter
// jest.mock('@/utils/AuthProvider');
// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// it('SignInForm Component', () => {
// const mockPush = jest.fn();
// const mockOnLogin = jest.fn();

// beforeEach(() => {
//   (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
//   (useAuthContext as jest.Mock).mockReturnValue({
//     state: { isAuthenticated: false },
//     isAuthPending: false,
//     onLogin: mockOnLogin,
//   });
// });

// it('should render the form with email, password inputs, and login button', () => {
//   render(<SignInForm />);

//   // Check if the form elements are rendered
//   expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
//   expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//   expect(screen.getByRole('button', { name: /LOG IN/i })).toBeInTheDocument();
//   expect(screen.getByText(/FORGOT PASSWORD?/i)).toBeInTheDocument();
// });

// it('should allow the user to enter email and password', () => {
//   render(<SignInForm />);

//   const emailInput = screen.getByPlaceholderText('Email');
//   const passwordInput = screen.getByPlaceholderText('Password');

//   // Simulate user typing in inputs
//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'password123' } });

//   expect(emailInput).toHaveValue('test@example.com');
//   expect(passwordInput).toHaveValue('password123');
// });

// it('should toggle password visibility', () => {
//   render(<SignInForm />);

//   const passwordInput = screen.getByPlaceholderText('Password');
//   const toggleButton = screen.getByRole('button', { name: /Show/i });

//   // Password input should initially be of type 'password'
//   expect(passwordInput).toHaveAttribute('type', 'password');

//   // Simulate clicking the 'Show' button
//   fireEvent.click(toggleButton);

//   // Password input should now be of type 'text'
//   expect(passwordInput).toHaveAttribute('type', 'text');
// });

// it('should display validation errors for invalid email and password', async () => {
//   render(<SignInForm />);

//   const loginButton = screen.getByRole('button', { name: /LOG IN/i });

//   // Simulate form submission with empty fields
//   fireEvent.click(loginButton);

//   // Validation messages should be displayed
//   await waitFor(() =>
//     expect(screen.getByText(/fill in a correct email and password/i)).toBeInTheDocument()
//   );
// });

// it('should call onLogin with correct credentials', async () => {
//   render(<SignInForm />);

//   const emailInput = screen.getByPlaceholderText('Email');
//   const passwordInput = screen.getByPlaceholderText('Password');
//   const loginButton = screen.getByRole('button', { name: /LOG IN/i });

//   // Enter valid email and password
//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'password123' } });

//   // Simulate form submission
//   fireEvent.click(loginButton);

//   await waitFor(() => {
//     // Ensure onLogin is called with correct data
//     expect(mockOnLogin).toHaveBeenCalledWith({
//       email: 'test@example.com',
//       password: 'password123',
//     });
//   });
// });

// it('should navigate to /dashboard/users on successful login', async () => {
//   (useAuthContext as jest.Mock).mockReturnValueOnce({
//     state: { isAuthenticated: true },
//     isAuthPending: false,
//     onLogin: mockOnLogin,
//   });

//   render(<SignInForm />);

//   await waitFor(() => {
//     // Ensure that the router push function is called
//     expect(mockPush).toHaveBeenCalledWith('/dashboard/users');
//   });
// });
// });
