import express, { Response, Request } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

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
	res.json('tickets');
});

// app.use(handleErrors);

export { app };
