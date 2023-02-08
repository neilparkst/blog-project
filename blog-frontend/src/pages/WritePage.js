import React from 'react';
import { Helmet } from 'react-helmet-async';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';

const WritePage = () => {
	return (
		<Responsive>
			<Helmet>
				<title>Write a post - Blog Project</title>
			</Helmet>
			<EditorContainer />
			<TagBoxContainer />
			<WriteActionButtonsContainer />
		</Responsive>
	);
};

export default WritePage;
