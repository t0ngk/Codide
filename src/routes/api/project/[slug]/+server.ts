import prisma from '$lib/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({params}) => {
    const {slug} = params
    const project = await prisma.project.findUnique({
        where: {
            slug
        },
        select: {
            name: true,
            slug: true,
            html: true,
            css: true,
            js: true,
            owner: {
                select: {
                    username: true,
                    displayName: true
                }
            }
        }
    });
    if (!project) {
        throw error(404, "Project not found.");
    }
    return json({...project})
};
