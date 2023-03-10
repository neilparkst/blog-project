import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostActionButtons from '../../components/post/PostActionButtons';
import PostViewer from '../../components/post/PostViewer';
import { deletePost } from '../../lib/api/posts';
import { readPost, unloadPost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';

const PostViewerContainer = () => {
	const navigate = useNavigate();
	const { postId } = useParams();
	const dispatch = useDispatch();
	const { post, error, loading, user } = useSelector(
		({ post, loading, user }) => ({
			post: post.post,
			error: post.error,
			loading: loading['post/READ_POST'],
			user: user.user,
		}),
	);

	useEffect(() => {
		dispatch(readPost(postId));
		return () => {
			dispatch(unloadPost());
		};
	}, [dispatch, postId]);

	const onEdit = () => {
		dispatch(setOriginalPost(post));
		navigate('/write');
	};

	const onDelete = async () => {
		try {
			await deletePost(postId);
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	};

	const ownPost = (user && user._id) === (post && post.user._id);

	return (
		<PostViewer
			post={post}
			loading={loading}
			error={error}
			actionButtons={
				ownPost && <PostActionButtons onEdit={onEdit} onDelete={onDelete} />
			}
		/>
	);
};

export default PostViewerContainer;
