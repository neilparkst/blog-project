import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { call, takeLatest } from 'redux-saga/effects';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // dealing with temporary login after refresh
// check the status of user
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
	createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function* logoutSaga() {
	try {
		yield call(authAPI.logout);
		localStorage.removeItem('user');
	} catch (e) {
		console.log(e);
	}
}

export function* userSaga() {
	yield takeLatest(CHECK, checkSaga);
	yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
	user: null,
	checkError: null,
};

export default handleActions(
	{
		[TEMP_SET_USER]: (state, { payload: user }) => ({
			...state,
			user,
		}),
		[CHECK_SUCCESS]: (state, { payload: user }) => ({
			...state,
			user,
			checkError: null,
		}),
		[CHECK_FAILURE]: (state, { payload: error }) => {
			try {
				localStorage.removeItem('user');
			} catch (e) {
				console.log('localStorage is not working');
			}

			return {
				...state,
				user: null,
				checkError: error,
			};
		},
		[LOGOUT]: (state) => ({
			...state,
			user: null,
		}),
	},
	initialState,
);
