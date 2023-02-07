import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = () => {
	const { username } = useParams();
	const [searchParams] = useSearchParams();
	const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
		lastPage: posts.lastPage,
		posts: posts.posts,
		loading: loading['posts/LIST_POSTS'],
	}));

	if (!posts || loading) return null;

	const tag = searchParams.get('tag');
	const page = parseInt(searchParams.get('page'), 10) || 1;

	return (
		<Pagination tag={tag} username={username} page={page} lastPage={lastPage} />
	);
};

export default PaginationContainer;
