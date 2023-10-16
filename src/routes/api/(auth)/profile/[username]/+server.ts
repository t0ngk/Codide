import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as jwt from 'jsonwebtoken';
import prisma from '$lib/prisma';
import { SECERT_KEY } from '$env/static/private';

interface JwtPayload {
    id: string;
    username: string;
};

export const GET: RequestHandler = async ({ params, cookies }) => {
	const { username } = params;
    let target;
    if (username === '@me') {
        const token = cookies.get('token');
        if (!token) {
            throw error(401, 'Unauthorized');
        }
        const decoded = jwt.verify(token, SECERT_KEY) as JwtPayload;
        if (!decoded) {
            throw error(401, 'Unauthorized');
        }
        target = decoded.username;
    } else {
        target = username;
    }
    const user = await prisma.user.findUnique({
        where: {
            username: target
        },
        select: {
            username: true,
            displayName: true,
            id: true,
            project: username === '@me' ? false : {
                select: {
                    name: true,
                    slug: true,
                }
            },
        }
    });
    if (!user) {
        throw error(404, 'User not found');
    }
	return json({ ...user });
};
