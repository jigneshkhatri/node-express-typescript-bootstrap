import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getEnvValue, getEnvironment } from './configs/env.config';
import APIVersion from './constants/api-version.constant';
import { appLogger } from './configs/logger.config';
import { authInterceptor } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';

// initialize express app
const app: Express = express();

// app port
const port = getEnvValue('PORT') || 4000;

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authInterceptor);

// app routes
app.get(`/${APIVersion.v1}/`, (req: Request, res: Response) => {
	res.json({ message: 'Hello World!' });
});

// global error handler
app.use(errorHandler);

// start the server
app.listen(port, async () => {
	appLogger.info('Active environment: %s', getEnvironment());
	appLogger.info('Server is running at http://localhost:%s', port);
});
