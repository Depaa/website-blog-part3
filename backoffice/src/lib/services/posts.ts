import { PUBLIC_BASE_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type CreateBlogPost from './interfaces/CreateBlogPost';
import type CreatePresignedUrl from './interfaces/CreatePresignedUrl';
import type UpdateBlogPost from './interfaces/UpdateBlogPost';

const POSTS_URL = `${PUBLIC_BASE_URL}/posts`;
const ADMIN_POSTS_URL = `${PUBLIC_BASE_URL}/admin/posts`;

const listPosts = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	nextToken = '',
	limit = 12
) => {
	console.time(`list-posts-${nextToken}`);
	const res = await fetch(`${POSTS_URL}?limit=${limit}&nextToken=${nextToken}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
		},
	});
	console.info('Posts fetched');
	const posts = await res.json();
	console.timeEnd(`list-posts-${nextToken}`);

	if (posts.data && Object.keys(posts.data).length) {
		console.debug(posts.data);
		return posts.data;
	}
	return [];
};

const listPostsAdmin = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	token: string,
	nextToken = '',
	limit = 12
) => {
	console.time(`list-posts-admin-${nextToken}`);
	const res = await fetch(`${ADMIN_POSTS_URL}?limit=${limit}&nextToken=${nextToken}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	console.info('Posts fetched for admin');
	const posts = await res.json();
	console.timeEnd(`list-posts-admin-${nextToken}`);

	if (posts.data && Object.keys(posts.data).length) {
		console.debug(posts.data);
		return posts.data;
	}
	return [];
};

const getPost = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	id: string
) => {
	console.time(`get-post-${id}`);
	const res = await fetch(`${POSTS_URL}/${id}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
		},
	});
	console.info('Post fetched');
	console.debug('headers', res.headers);
	const posts = await res.json();
	console.timeEnd(`get-post-${id}`);

	if (posts.data && Object.keys(posts.data).length) {
		console.debug(posts.data);
		return posts.data;
	}
	throw error(404, 'Not found');
};

const getPostAdmin = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	id: string,
	token: string,
) => {
	console.time(`get-post-admin-${id}`);
	const res = await fetch(`${ADMIN_POSTS_URL}/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
	});
	console.info('Post fetched');
	console.debug('headers', res.headers);
	const posts = await res.json();
	console.timeEnd(`get-post-admin-${id}`);

	if (posts.data && Object.keys(posts.data).length) {
		console.debug(posts.data);
		return posts.data;
	}
	throw error(404, 'Not found');
};

const updatePost = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	token: string,
	id: string,
	data: UpdateBlogPost
) => {
	console.time(`update-post-${id}`);
	const res = await fetch(`${ADMIN_POSTS_URL}/${id}`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	console.info('Post updated');
	console.timeEnd(`update-post-${id}`);
	console.debug(res);
};

const createPost = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	token: string,
	data: CreateBlogPost
) => {
	console.time('create-post');
	const res = await fetch(`${ADMIN_POSTS_URL}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	console.info('Post created');
	const id = await res.json();
	console.timeEnd('create-post');
	console.debug(res);
	return id;
};

const deletePost = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	token: string,
	id: string
) => {
	console.time(`delete-post-${id}`);
	const res = await fetch(`${ADMIN_POSTS_URL}/${id}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	console.info('Post deleted');
	console.timeEnd(`delete-post-${id}`);
	console.debug(res);
};

const publishPost = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	token: string,
	id: string,
) => {
	console.time(`publish-post-${id}`);
	const res = await fetch(`${ADMIN_POSTS_URL}/${id}/publish`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	console.info('Post published');
	console.timeEnd(`publish-post-${id}`);
	console.debug(res);
};

const createPresignedUrl = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	token: string,
	id: string,
	data: CreatePresignedUrl
) => {
	console.time(`create-presigned-url-${id}`);
	const res = await fetch(`${ADMIN_POSTS_URL}/${id}/presigned-url`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	console.info('Done creating presigned url');
	const presignedUrl = await res.json();
	console.timeEnd(`create-presigned-url-${id}`);
	console.debug(res);

	if (presignedUrl.data && Object.keys(presignedUrl.data).length) {
		console.debug(presignedUrl.data);
		return presignedUrl.data;
	}
	return {};
};

export { listPosts, getPost, updatePost, createPost, deletePost, publishPost, createPresignedUrl, listPostsAdmin, getPostAdmin };

