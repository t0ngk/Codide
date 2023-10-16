import { authenticateUser } from '$lib/server/auth';
import type { User } from '$lib/types/user';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const PATCH: RequestHandler = async (event) => {
    const user:User = await authenticateUser(event);
    if (!user) {
        throw error(401, 'Unauthorized');
    };
    const { request } = event;
    const { displayName } = await request.json();
    if (!displayName) {
        throw error(400, 'Missing displayName');
    };
    if (displayName.length < 4 || displayName.length > 20) {
        throw error(400, 'Invalid displayName length');
    };
    const updatedUser = await prisma.user.update({
        where: {
            username: user.username
        },
        data: {
            displayName
        }
    });
    if (!updatedUser) {
        throw error(500, 'Failed to update user');
    };
    return json({
        sucess: true
    });
};
