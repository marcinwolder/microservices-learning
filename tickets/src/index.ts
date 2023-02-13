import { createConnection } from 'mysql2';
import { app } from './app';

(async () => {
	if (!process.env.JWT_KEY) throw new Error('no JWT_KEY env connected');

	const link = createConnection({
		host: '34.65.134.45',
		user: 'root',
		password: 'Mw122122',
		database: 'tickets',
	});

	link.connect(function (err) {
		if (err) throw err;
		console.log('Connected!');
	});

	app.listen(4000, () => {
		console.log('server started on port 4000');
	});
})();
