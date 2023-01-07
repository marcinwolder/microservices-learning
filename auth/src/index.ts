import express, { Response, Request, NextFunction } from 'express';
import { json } from 'body-parser';
import { validationResult, ValidationError, body } from 'express-validator';
import mongoose from 'mongoose';
import { User } from '../models/users';
import { handleErrors } from './middleware/errors/handleErrors';
import { NotFoundError } from './middleware/errors/NotFoundError';
import { BadRequestError } from './middleware/errors/BadRequestError';

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
			next(new BadRequestError(errors[0].msg, errors[0].param ?? ''));
		} else {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (user) {
				return next(new BadRequestError('email in use', ''));
			}

			const newUser = new User({ email, password });
			await newUser.save();

			res.status(201).json(newUser);
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
