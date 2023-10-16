import type { RequestEvent } from '@sveltejs/kit';

export const authenticateUser = async (event: RequestEvent) => {
	const { cookies, fetch } = event;
	const token = cookies.get('token');
	if (!token) {
		return null;
	}
	const res = await fetch('/api/profile/@me');

	if (res.ok) {
		return res.json();
	} else {
		return null;
	}
};
