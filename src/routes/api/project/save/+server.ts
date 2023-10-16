import { authenticateUser } from '$lib/server/auth';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { User } from '$lib/types/user';
import prisma from '$lib/prisma';
import { init } from '@paralleldrive/cuid2';

export const POST: RequestHandler = async (event) => {
    const { request } = event;
    const user:User = await authenticateUser(event);
    if (!user) {
        throw error(401, 'Unauthorized');
    }
    const { name, slug, html, css, js } = await request.json();
    if (!name || !slug) {
        throw error(400, 'Invalid request body.');
    }
    if (slug === 'new') {
        const newSlug = init({length: 7});
        const project = await prisma.project.create({
            data: {
                name: name,
                slug: newSlug(),
                html: html || '',
                css: css || '',
                js: js || '',
                owner: {
                    connect: {
                        username: user.username
                    }
                }
            }
        });
        return json({ slug: project.slug, create: true });
    } else {
        const existingProject = await prisma.project.findUnique({
            where: {
                slug: slug
            },
            include: {
                owner: {
                    select: {
                        username: true
                    }
                }
            }
        });
        if (!existingProject) {
            throw error(404, 'Project not found.');
        }
        if (user.username !== existingProject.owner.username) {
            throw error(400, 'Missing Permision.');
        }
        const project = await prisma.project.update({
            where: {
                slug: slug
            },
            data: {
                name: name,
                html: html || '',
                css: css || '',
                js: js || '',
            }
        });
        return json({ slug: project.slug, create: false });
    }
};
