import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';

let mongo: any;
beforeAll(async () => {
	mongo = MongoMemoryServer.create();
	const mongoUri = await mongo.getUri();
	await mongoose.connect(mongoUri);

	process.env.JWT_KEY = '';
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
