import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getEnvValue } from './configs/env.config';
import APIVersion from './constants/api-version.constant';
import Logger from './utils/logger.util';

const app: Express = express();
const port = getEnvValue('PORT') || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(`/${APIVersion.v1}/`, (req: Request, res: Response) => {
	res.json({ message: 'Hello World!' });
});

app.listen(port, async () => {
	Logger.info(`Server is running at http://localhost:${port}`);
});
