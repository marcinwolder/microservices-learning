import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError, expressValidatorError } from '@lmuml/common';
import { User } from '../../models/users';
import { Password } from '../../services/Password';

const signInRouter = Router();

signInRouter.post(
	'/api/auth/signIn',
	[
		body('password').trim().notEmpty().withMessage('enter password'),
		body('email').trim().notEmpty().withMessage('enter email'),
	],
	expressValidatorError,
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user || !Password.compare(user.password, password)) {
			return next(new BadRequestError('wrong email or password'));
		}

		req.session = {
			jwt: jwt.sign(user.toJSON(), process.env.JWT_KEY!),
		};

		res.status(200).json(user);
	}
);

export { signInRouter };
