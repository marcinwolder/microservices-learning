import request from 'supertest';
import { Ticket } from '../../../models/ticket';
import { app } from '../../app';

const url = '/api/tickets';

it('path is accessible', async () => {
	const res = await request(app).get(`${url}/ticket-id`);
	expect(res.statusCode).not.toBe(404);
});
it('returns error if not logged in', async () => {
	await request(app).get(`${url}/ticket-id`).expect(401);
});
it('returns no error if logged in', async () => {
	const ticket = await createTicket();

	let res = await request(app)
		.get(`${url}/${ticket.id}`)
		.set('Cookie', signIn())
		.send();
	expect(res.statusCode).not.toBe(401);
});
it('returns data of provided ticket id', async () => {
	const ticket = await createTicket();

	let res = await request(app)
		.get(`${url}/${ticket.id}`)
		.set('Cookie', signIn())
		.send()
		.expect(200);

	expect(res.body.id).toEqual(ticket.id);
});
it('returns error if ticket with given id is not found', async () => {
	const ticket = await createTicket();
	const _id = ticket.id;
	await Ticket.deleteOne({ _id });
	let res = await request(app)
		.get(`${url}/${_id}`)
		.set('Cookie', signIn())
		.send();

	expect(res.statusCode).toBe(400);
});
