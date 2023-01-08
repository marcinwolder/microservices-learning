import express, { Response, Request, NextFunction } from 'express';
import { json } from 'body-parser';
import { validationResult, ValidationError, body } from 'express-validator';
import mongoose from 'mongoose';
import { User } from '../models/users';
import {
	handleErrors,
	NotFoundError,
	BadRequestError,
	ValidationErrors,
} from './middleware/errors';
import { Password } from '../services/Password';

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
			.notEmpty()
			.withMessage('enter password')
			.isStrongPassword()
			.withMessage('use stronger password')
			.isLength({ min: 8 })
			.withMessage('password must be at least 8 chars long'),
		body('email')
			.trim()
			.notEmpty()
			.withMessage('enter email')
			.isEmail()
			.withMessage('use right email format'),
	],
	async (req: Request, res: Response, next: NextFunction) => {
		if (!validationResult(req).isEmpty()) {
			const errors = validationResult(req).array() as ValidationError[];
			next(new ValidationErrors(errors));
		} else {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (user) {
				return next(new BadRequestError('email in use'));
			}

			const newUser = User.build({ email, password });
			await newUser.save();

			res.status(201).json(newUser);
		}
	}
);

app.post('/auth/test', async (req: Request, res: Response) => {
	const { storedPassword, password } = req.body;

	res.json(Password.compare(storedPassword, password));
});

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
