import { authenticateUser } from '$lib/server/auth';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { User } from '$lib/types/user';
import prisma from '$lib/prisma';

export const DELETE: RequestHandler = async (event) => {
    const user:User = await authenticateUser(event);
    const { params } = event;
    if (!user) {
        throw error(401, 'Unauthorized');
    }
    const { slug } = params;
    const project = await prisma.project.findUnique({
        where: {
            slug: slug
        },
        select: {
            owner: {
                select: {
                    username: true,
                    displayName : true
                }
            }
        }
    });
    if (!project) {
        throw error(404, 'Project not found.');
    }
    if (user.username !== project.owner.username) {
        throw error(400, 'Missing Permision.');
    }
    const deleteProject = await prisma.project.delete({
        where: {
            slug: slug
        }
    });
    if (!deleteProject) {
        throw error(400, 'Delete fail.');
    }
    return json({
        sucess: true
    })
};
