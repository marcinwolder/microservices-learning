import express, { Response, Request } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { NotFoundError, handleErrors } from '@lmuml/common';

const app = express();

app.use(json());

app.set('trust proxy', true);
app.use(
	cookieSession({
		secure: false,
		signed: false,
	})
);

app.all('*', (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(handleErrors);

export { app };
