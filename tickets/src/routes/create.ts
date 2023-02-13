import { Router } from 'express';

const router = Router();
router.post('/api/tickets', (req, res) => {
	res.sendStatus(201);
});

export { router as createPath };
