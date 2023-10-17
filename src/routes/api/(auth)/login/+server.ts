import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import User from '$lib/validators/User';
import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECERT_KEY } from '$env/static/private'

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, password } = await request.json();
	const validator = User.safeParse({
		username: username,
		password: password,
		displayName: username
	});
	if (!validator.success) {
		throw error(400, 'Invalid request body.');
	}
	const data = validator.data;
	const user = await prisma.user.findUnique({
		where: {
			username: data.username
		}
	});
	if (!user) {
		throw error(400, 'Invalid username or password.');
	}
	const passwordMatch = bcrypt.compareSync(data.password, user.password);
	if (!passwordMatch) {
		throw error(400, 'Invalid username or password.');
	}
	const token = jwt.sign({ id: user.id, username: user.username }, SECERT_KEY);
	cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
	});
	return json({ sucess: true });
};
