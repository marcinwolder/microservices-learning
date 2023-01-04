import express from 'express';
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
app.listen(4000, () => {
	console.log('server started on port 4000');
});
