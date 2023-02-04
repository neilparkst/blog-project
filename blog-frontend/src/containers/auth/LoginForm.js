import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initialiseForm, login } from '../../modules/auth';
import { check } from '../../modules/user';

const LoginForm = () => {
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
		form: auth.login,
		auth: auth.auth,
		authError: auth.authError,
		user: user.user,
	}));

	// Event Handler for changing input
	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'login',
				key: name,
				value,
			}),
		);
	};

	// Event Handler for registering form
	const onSubmit = (e) => {
		e.preventDefault();
		const { username, password } = form;
		dispatch(login({ username, password }));
	};

	// initialise form at the first rendering of component
	useEffect(() => {
		dispatch(initialiseForm('login'));
	}, [dispatch]);

	useEffect(() => {
		if (authError) {
			console.log('Error occurred');
			console.log(authError);
			setError('Login Failed');
			return;
		}
		if (auth) {
			console.log('Login Success');
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
			type="login"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			error={error}
		/>
	);
};

export default LoginForm;
