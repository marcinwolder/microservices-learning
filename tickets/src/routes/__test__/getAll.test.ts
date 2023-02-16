import request from 'supertest';
import { app } from '../../app';

const url = '/api/tickets';

it('path is accessible', async () => {
	let res = await request(app).get(url);
	expect(res.statusCode).not.toBe(404);
});
it('returns list of tickets if everything valid', async () => {
	const ticket = await createTicket();

	let res = await request(app).get(url).send().expect(200);

	expect(res.body[0] === ticket);
});
