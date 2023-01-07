import express, { Response, Request } from 'express';
import { json } from 'body-parser';
import { validationResult, ValidationError, body } from 'express-validator';
import mongoose from 'mongoose';
import { handleErrors } from './middleware/errors/handleErrors';
import { NotFoundError } from './middleware/errors/NotFoundError';

const app = express();

app.use(json());

app.get('/auth/currentUser', (req: Request, res: Response) => {
	res.json('hello world');
});

app.post(
	'/auth/createUser',
	[
		body('password')
			.trim()
			.isStrongPassword()
			.withMessage('use stronger password')
			.isLength({ min: 8 })
			.withMessage('password must be at least 8 chars long'),
		body('email').trim().isEmail().withMessage('use right email format'),
	],
	(req: Request, res: Response) => {
		if (!validationResult(req).isEmpty()) {
			const errors = validationResult(req).array() as ValidationError[];
			console.log(errors);
			return res.send({});
		} else {
			return res.send('user created');
		}
	}
);

app.all('*', (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(handleErrors);

(async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect('mongodb://auth-mongo-ip-srv:27017/auth');
		console.log('DB connected!');
	} catch (err) {
		console.error('DB error');
	}
	app.listen(4000, () => {
		console.log('server started on port 4000');
	});
})();
