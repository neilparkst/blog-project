import Router from 'koa-router';
import checkedLoggedIn from '../../lib/checkedLoggedIn';
import * as postsCtrl from './posts.ctrl';

const posts = Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkedLoggedIn, postsCtrl.write);
posts.get('/:id', postsCtrl.getPostById, postsCtrl.read);
posts.delete(
	'/:id',
	postsCtrl.getPostById,
	checkedLoggedIn,
	postsCtrl.checkOwnPost,
	postsCtrl.remove,
);
posts.patch(
	'/:id',
	postsCtrl.getPostById,
	checkedLoggedIn,
	postsCtrl.checkOwnPost,
	postsCtrl.update,
);

export default posts;
