import express from 'express';
import mongoose from 'mongoose';
import { handleErrors } from './middleware/errors/handleErrors';
import { NotFoundError } from './middleware/errors/NotFoundError';

const app = express();

app.get('/auth/currentUser', (req, res) => {
	res.json('hello world');
});

app.all('*', () => {
	throw new NotFoundError();
});

app.use(handleErrors);

(async () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-ip-srv:27017/auth');
		console.log('DB connected!');
	} catch (err) {
		console.error('DB error');
	}
	app.listen(4000, () => {
		console.log('server started on port 4000');
	});
})();
