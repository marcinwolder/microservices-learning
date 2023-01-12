import { Router, Request, Response } from 'express';

const logoutRouter = Router();

logoutRouter.post('/auth/logout', (req: Request, res: Response) => {
	req.session = null;

	res.send({});
});

export { logoutRouter };
