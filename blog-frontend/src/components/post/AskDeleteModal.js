import React from 'react';
import AskModal from '../common/AskModal';

const AskDeleteModal = ({ visible, onConfirm, onCancel }) => {
	return (
		<AskModal
			visible={visible}
			title="Delete a post"
			description="Do you really want to delete the post?"
			confirmText="Delete"
			onConfirm={onConfirm}
			onCancel={onCancel}
		/>
	);
};

export default AskDeleteModal;
