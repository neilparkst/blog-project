import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import Responsive from './Responsive';

const HeaderBlock = styled.div`
	position: fixed;
	width: 100%;
	background: white;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// new component after adding styles to Responsive component's properties
const Wrapper = styled(Responsive)`
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.logo {
		font-size: 1.125rem;
		font-weight: 800;
		letter-spacing: 2px;
	}
	.right {
		display: flex;
		align-items: center;
	}
`;

// Because HeaderBlock's position is fixed, this is a component which make a page's content appear 4rem below
const Spacer = styled.div`
	height: 4rem;
`;

const UserInfo = styled.div`
	font-weight: 800;
	margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<Link to="/" className="logo">
						Blog Project
					</Link>
					{user ? (
						<div className="right">
							<UserInfo>{user.username}</UserInfo>
							<Button onClick={onLogout}>Sign out</Button>
						</div>
					) : (
						<div className="right">
							<Button to="/login">Sign in</Button>
						</div>
					)}
				</Wrapper>
			</HeaderBlock>
			<Spacer />
		</>
	);
};

export default Header;
