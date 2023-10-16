import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { project, user } = await parent();
	return { user, project };
}) satisfies PageServerLoad;
