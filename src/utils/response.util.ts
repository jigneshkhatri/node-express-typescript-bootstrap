/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const ok200 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 200, body);
};
export const err400 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 400, body);
};
export const err500 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 500, body);
};

export const err401 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 401, body);
};
export const err403 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 403, body);
};

export const response = (
	res: Response,
	statusCode: number,
	body: null | any = null
): Response<any, Record<string, any>> => {
	if (body) {
		return res.status(statusCode).json(body);
	}
	return res.sendStatus(statusCode);
};
