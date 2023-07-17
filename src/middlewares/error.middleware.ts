import { NextFunction, Request, Response } from 'express';
import { appLogger } from '../configs/logger.config';
import { err500 } from '../utils/response.util';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	appLogger.error('Global error handler: %s', err.stack);
	err500(res, { error: err.message });
};
