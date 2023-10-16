import { authenticateUser } from '$lib/server/auth';

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/api')) {
		return resolve(event);
	}
	event.locals.user = await authenticateUser(event);
	const response = await resolve(event);
	return response;
}
