import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskDeleteModal from './AskDeleteModal';

const PostActionButtonsBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 2rem;
	margin-top: -1.5rem;
`;

const ActionButton = styled.button`
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	color: ${palette.gray[6]};
	font-weight: bold;
	border: none;
	outline: none;
	font-size: 0.875rem;
	cursor: pointer;
	&:hover {
		background: ${palette.gray[1]};
		color: ${palette.cyan[7]};
	}
	& + & {
		margin-left: 0.25rem;
	}
`;

const PostActionButtons = ({ onEdit, onDelete }) => {
	const [modal, setModal] = useState(false);
	const onDeleteClick = () => {
		setModal(true);
	};
	const onCancel = () => {
		setModal(false);
	};
	const onConfirm = () => {
		setModal(false);
		onDelete();
	};

	return (
		<>
			<PostActionButtonsBlock>
				<ActionButton onClick={onEdit}>Edit</ActionButton>
				<ActionButton onClick={onDeleteClick}>Delete</ActionButton>
			</PostActionButtonsBlock>
			<AskDeleteModal
				visible={modal}
				onConfirm={onConfirm}
				onCancel={onCancel}
			/>
		</>
	);
};

export default PostActionButtons;
