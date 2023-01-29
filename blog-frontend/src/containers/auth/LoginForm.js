import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initialiseForm } from '../../modules/auth';

const LoginForm = () => {
	const dispatch = useDispatch();
	const { form } = useSelector(({ auth }) => ({
		form: auth.login,
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
		// to be implemented
	};

	// initialise form at the first rendering of component
	useEffect(() => {
		dispatch(initialiseForm('login'));
	}, [dispatch]);

	return (
		<AuthForm
			type="login"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export default LoginForm;
