import { authenticateUser } from '$lib/server/auth';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { init } from '@paralleldrive/cuid2';
import type { User } from '$lib/types/user';

export const GET: RequestHandler = async (event) => {
    const user:User = await authenticateUser(event);
    const { params } = event;
    if (!user) {
        throw error(401, 'Unauthorized');
    }
    const { slug } = params;
    const project = await prisma.project.findUnique({
        where: {
            slug: slug
        }
    });
    if (!project) {
        throw error(404, 'Project not found.');
    }
    const newSlug = init({length: 7});
    const newProject = await prisma.project.create({
        data: {
            name: project.name,
            slug: newSlug(),
            html: project.html,
            css: project.css,
            js: project.js,
            owner: {
                connect: {
                    username: user.username
                }
            }
        }
    });
    return json({ slug: newProject.slug });
};
