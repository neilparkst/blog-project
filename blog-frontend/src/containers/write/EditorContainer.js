import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../components/write/Editor';
import { changeField, initialise } from '../../modules/write';

const EditorContainer = () => {
	const dispatch = useDispatch();
	const { title, body } = useSelector(({ write }) => ({
		title: write.title,
		body: write.body,
	}));
	const onChangeField = useCallback(
		(payload) => dispatch(changeField(payload)),
		[dispatch],
	);

	useEffect(() => {
		return () => {
			dispatch(initialise());
		};
	}, [dispatch]);

	return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
