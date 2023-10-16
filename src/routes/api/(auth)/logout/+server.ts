import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({cookies}) => {
    cookies.set('token', '', {
        path: '/',
        maxAge: 0,
        sameSite: 'lax',
        secure: true,
    });
    return json({ success: true });
};
