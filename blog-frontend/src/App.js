import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

const App = () => {
	return (
		<>
			<Helmet>
				<title>Blog Project</title>
			</Helmet>
			<Routes>
				<Route element={<PostListPage />} path="/" />
				<Route element={<PostListPage />} path="/:username" />
				<Route element={<LoginPage />} path="/login/*" />
				<Route element={<RegisterPage />} path="/register/*" />
				<Route element={<WritePage />} path="/write/*" />
				<Route element={<PostPage />} path="/:username/:postId/*" />
			</Routes>
		</>
	);
};

export default App;
