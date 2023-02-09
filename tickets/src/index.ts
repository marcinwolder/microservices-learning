import { createConnection } from 'mysql';
import { app } from './app';

(async () => {
	if (!process.env.JWT_KEY) throw new Error('no JWT_KEY env connected');

	const link = createConnection('http://tickets-mysql-ip-srv:3306');

	link.connect(function (err) {
		if (err) throw err;
		console.log('Connected!');
	});

	app.listen(4000, () => {
		console.log('server started on port 4000');
	});
})();
