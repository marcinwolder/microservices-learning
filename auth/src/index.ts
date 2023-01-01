import express from 'express';

const app = express();

app.get('/auth/currentUser', (req, res) => {
	res.json('hello world');
});

app.listen(4000, () => {
	console.log('server started');
});
