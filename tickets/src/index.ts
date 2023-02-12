import { createConnection } from 'mysql';
import { app } from './app';

(async () => {
	if (!process.env.JWT_KEY) throw new Error('no JWT_KEY env connected');

	const link = createConnection({
		host: 'tickets-mysql-ip-srv',
		port: 3306,
		user: 'root',
		password: '',
	});

	link.connect(function (err) {
		if (err) throw err;
		console.log('Connected!');
	});

	app.listen(4000, () => {
		console.log('server started on port 4000');
	});
})();
