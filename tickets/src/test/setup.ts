import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';

declare global {
	var signIn: () => string[];
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
