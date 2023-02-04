import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initialiseForm, register } from '../../modules/auth';
import { check } from '../../modules/user';

const RegisterForm = () => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
		form: auth.register,
		auth: auth.auth,
		authError: auth.authError,
		user: user.user,
	}));

	// Event Handler for changing input
	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'register',
				key: name,
				value,
			}),
		);
	};

	// Event Handler for registering form
	const onSubmit = (e) => {
		e.preventDefault();
		const { username, password, passwordConfirm } = form;
		// if any of them is blank
		if ([username, password, passwordConfirm].includes('')) {
			setError('Please Fill in all the blanks');
			return;
		}

		if (password !== passwordConfirm) {
			setError('Passwords are not matched each other');
			dispatch(changeField({ form: 'register', key: 'password', value: '' }));
			dispatch(
				changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
			);
			return;
		}
		dispatch(register({ username, password }));
	};

	// initialise form at the first rendering of component
	useEffect(() => {
		dispatch(initialiseForm('register'));
	}, [dispatch]);

	// dealing with success/failure of register
	useEffect(() => {
		if (authError) {
			if (authError.response.status === 409) {
				setError('The ID already exists');
				return;
			}
			setError('Sign In Failed');
			return;
		}
		if (auth) {
			console.log('Register Success');
			console.log(auth);
			dispatch(check());
		}
	}, [auth, authError, dispatch]);

	useEffect(() => {
		if (user) {
			navigate('/');
			try {
				localStorage.setItem('user', JSON.stringify(user));
			} catch (e) {
				console.log('localStorage is not working');
			}
		}
	}, [user, navigate]);
	return (
		<AuthForm
			type="register"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			error={error}
		/>
	);
};

export default RegisterForm;
