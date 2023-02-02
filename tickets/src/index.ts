import mongoose from 'mongoose';
import { app } from './app';

(async () => {
	if (!process.env.JWT_KEY) throw new Error('no JWT_KEY env connected');
	if (!process.env.MONGO_URL) throw new Error('no MONGO_URL env connected');

	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(process.env.MONGO_URL);
		console.log('DB connected!');
	} catch (err) {
		console.error('DB error');
	}
	app.listen(4000, () => {
		console.log('server started on port 4000');
	});
})();
