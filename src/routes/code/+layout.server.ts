import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Project } from '$lib/types/project';

export const load = (async ({locals, params, fetch}) => {
    const { user } = locals;
    const { id } = params
    let project:Project | null = null;
    if (id !== "new") {        
        const res = await fetch(`/api/project/${id}`);
        if (res.ok) {
            project = await res.json();
        } else {
            throw redirect(302, '/404');
        }
    } else {
        project = {
            name: 'New project',
            slug: 'new',
            html: '',
            css: '',
            js: '',
            owner: user
        }
    }
    return { user, project };
}) satisfies LayoutServerLoad;
