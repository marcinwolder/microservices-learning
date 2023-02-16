import express, { Response, Request } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, handleErrors, currentUser } from '@lmuml/common';

import { createPath } from './routes/create';
import { getAllPath } from './routes/getAll';
import { getOnePath } from './routes/getOne';
import { updatePath } from './routes/update';

const app = express();

app.use(json());

app.set('trust proxy', true);
app.use(
	cookieSession({
		secure: false,
		signed: false,
	})
);

app.use(currentUser);

app.use(updatePath);
app.use(getOnePath);
app.use(createPath);
app.use(getAllPath);

app.all('*', (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(handleErrors);

export { app };
