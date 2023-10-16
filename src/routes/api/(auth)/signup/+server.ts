import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import User from '$lib/validators/User';
import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
	const { username, password, confirmPassword } = await request.json();
	const validator = User.safeParse({ username: username, password: password, displayName: username });
    const usernameRules = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernameRules.test(username)) {
        throw error(400, 'Invalid username format.');
    }
	if (password !== confirmPassword || !validator.success) {
		throw error(400, 'Invalid request body.');
	}
	const data = validator.data;
	const existingUser = await prisma.user.findUnique({
		where: {
			username: data.username
		}
	});
	if (existingUser) {
		throw error(400, 'Username already exists.');
	}
	const user = await prisma.user.create({
		data: {
			username: data.username,
			displayName: data.displayName,
			password: bcrypt.hashSync(data.password, 10)
		}
	});
	if (!user) {
		throw error(400, 'Something went wrong.');
	}
	return json({ success: true });
};
