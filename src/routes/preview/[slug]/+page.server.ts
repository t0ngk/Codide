import type { Project } from '$lib/types/project';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const { slug } = params;
	let project: Project | null = null;
	const res = await fetch(`/api/project/${slug}`);
	if (res.ok) {
		project = await res.json();
	} else {
		throw redirect(302, '/404');
	}
	return {
		project
	};
}) satisfies PageServerLoad;
