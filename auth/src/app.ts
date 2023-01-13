import express, { Response, Request } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { NotFoundError } from './errors';
//prettier-ignore
import { currentUserRouter, signInRouter, signUpRouter, logoutRouter } from './routes';
import { handleErrors } from './middleware/handle-errors';

const app = express();

app.use(json());

app.set('trust proxy', true);
app.use(
	cookieSession({
		secure: false,
		signed: false,
	})
);

app.use(signInRouter);
app.use(signUpRouter);
app.use(currentUserRouter);
app.use(logoutRouter);

app.all('*', (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(handleErrors);

export { app };
