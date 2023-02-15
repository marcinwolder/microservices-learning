import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import { TicketDoc } from '../../models/ticket';

declare global {
	var signIn: () => string[];
	var createTicket: () => Promise<TicketDoc>;
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
	mongoose.set('strictQuery', false);
	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();
	await mongoose.connect(mongoUri);

	process.env.JWT_KEY = 'asdf';
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (const collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	if (mongo) {
		await mongo.stop();
	}
	await mongoose.connection.close();
});

global.signIn = () => {
	const payload = {
		id: 2,
		email: 'marcinwolder7@gmail.com',
	};
	const token = jwt.sign(payload, process.env.JWT_KEY!);
	const session = { jwt: token };
	const sessionJSON = JSON.stringify(session);
	const base64 = Buffer.from(sessionJSON).toString('base64');

	return [`session=${base64}`];
};
global.createTicket = async () => {
	const ticket = await request(app)
		.post('/api/tickets')
		.set('Cookie', signIn())
		.send({
			title: 'important ticket',
			price: 10.28,
		})
		.expect(201);
	return ticket.body;
};
