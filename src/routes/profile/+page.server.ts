import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;
	if (!user) {
		throw redirect(302, '/login');
	} else {
		throw redirect(302, `/profile/${user.username}`);
	}
}) satisfies PageServerLoad;
