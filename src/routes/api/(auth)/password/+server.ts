import { authenticateUser } from '$lib/server/auth';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import * as bcrypt from 'bcryptjs';

export const POST: RequestHandler = async (event) => {
	const user = await authenticateUser(event);
    if (!user) {
        throw error(401, 'Unauthorized');
    };
    const { request } = event;
    const { password, newPassword, confirmPassword } = await request.json();
    if (!password || !newPassword || !confirmPassword) {
        throw error(400, 'Invalid request');
    };
    if (newPassword !== confirmPassword) {
        throw error(400, 'Passwords do not match');
    };
    if (newPassword.length < 8) {
        throw error(400, 'Password must be at least 8 characters long');
    };
    const validUser = await prisma.user.findUnique({
        where: {
            username: user.username
        },
        select: {
            password: true
        }
    });
    if (!validUser) {
        throw error(500, 'Failed to validate user');
    };
    if (!bcrypt.compareSync(password, validUser.password)) {
        throw error(400, 'Invalid password');
    };
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const updatedUser = await prisma.user.update({
        where: {
            username: user.username
        },
        data: {
            password: hashedPassword
        }
    });
    if (!updatedUser) {
        throw error(500, 'Failed to update user');
    };
	return json({
        success: true
    });
};
