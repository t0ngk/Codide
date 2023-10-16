import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { goto } from '$app/navigation';

export const load = (async ({ fetch, params }) => {
    const { id } = params;
    let profile;
    const res = await fetch(`/api/profile/${id}`);
    if (res.ok) {
        profile = await res.json();
    } else {
        throw redirect(302, '/404');
    }
	return {profile};
}) satisfies PageServerLoad;
