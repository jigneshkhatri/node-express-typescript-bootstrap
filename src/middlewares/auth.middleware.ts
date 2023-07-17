import { NextFunction, Request, Response } from 'express';
import { appLogger } from '../configs/logger.config';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const authInterceptor = (req: Request, res: Response, next: NextFunction) => {
	appLogger.info('Intercepting: %s', req.url);
	next();
};
