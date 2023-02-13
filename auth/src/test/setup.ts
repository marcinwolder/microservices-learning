import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { app } from '../app';

declare global {
	var signup: () => Promise<string[]>;
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

global.signup = async () => {
	const res = await request(app)
		.post('/api/auth/signUp')
		.send({
			email: 'marcinwolder7@gmail.com',
			password: 'Marcin1*',
		})
		.expect(201);
	return res.get('Set-Cookie');
};
