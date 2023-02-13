import request from 'supertest';
import { app } from '../../app';

it('removes cookie after logging out', async () => {
	await global.signup();
	const res = await request(app).post('/api/auth/logout').expect(200);
	expect(res.get('Set-Cookie')).toEqual([
		'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
	]);
});
