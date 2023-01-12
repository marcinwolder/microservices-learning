import express, { Response, Request } from 'express';
import { validationResult, ValidationError, body } from 'express-validator';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
	handleErrors,
	NotFoundError,
	ValidationErrors,
} from './middleware/errors';
import { Password } from '../services/Password';
import { signInRouter, signUpRouter } from './routes';

const app = express();

app.use(json());

app.set('trust proxy', true);
app.use(
	cookieSession({
		secure: true,
		signed: false,
	})
);

app.use(signInRouter);
app.use(signUpRouter);

app.get('/auth/currentUser', (req: Request, res: Response) => {
	res.json('hello world');
});

app.get(
	'/auth/checkPassword',
	[
		body('storedPassword').notEmpty().withMessage('enter storedPassword'),
		body('password').notEmpty().withMessage('enter password to compare'),
	],
	async (req: Request, res: Response) => {
		if (!validationResult(req).isEmpty()) {
			const errors = validationResult(req).array() as ValidationError[];
			throw new ValidationErrors(errors);
		}

		const { storedPassword, password } = req.body;

		res.json(Password.compare(storedPassword, password));
	}
);

app.all('*', (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(handleErrors);

export { app };
