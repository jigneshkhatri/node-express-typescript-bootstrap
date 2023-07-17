import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { getEnvValue } from './env.config';

// define all the possible log levels (highest to lowest priority)
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	verbose: 3,
	debug: 4,
};

// transports configuration - start

const transportsToConfigure = getEnvValue('LOG_TRANSPORTS')?.split(',') || ['console'];

// transports for logger to be used in code
const transports: winston.transport[] = [];

// transports for logger which will log application (system) or config logs
const appLogTransports: winston.transport[] = [];

// construct the log transports (console or file) as defined in env file
transportsToConfigure.forEach((singleTransport) => {
	switch (singleTransport) {
		case 'file':
			// separate log file for error logs
			transports.push(
				new DailyRotateFile({
					filename: 'error-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxSize: '100m',
					maxFiles: '15d',
					level: 'error',
					format: winston.format.combine(
						winston.format.printf(
							(info) =>
								`{"timestamp":"${info.timestamp}", "level":"${info.level}", "message":"${info.message}"}`
						)
					),
				})
			);

			// this log file will contain all the permitted log levels
			transports.push(
				new DailyRotateFile({
					filename: 'combined-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxSize: '100m',
					maxFiles: '15d',
					format: winston.format.combine(
						winston.format.printf(
							(info) =>
								`{"timestamp":"${info.timestamp}", "level":"${info.level}", "message":"${info.message}"}`
						)
					),
				})
			);

			appLogTransports.push(
				new DailyRotateFile({
					filename: 'app-error-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxSize: '100m',
					maxFiles: '15d',
					level: 'error',
					format: winston.format.combine(
						winston.format.printf(
							(info) =>
								`{"timestamp":"${info.timestamp}", "level":"${info.level}", "message":"${info.message}"}`
						)
					),
				})
			);
			appLogTransports.push(
				new DailyRotateFile({
					filename: 'app-combined-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxSize: '100m',
					maxFiles: '15d',
					format: winston.format.combine(
						winston.format.printf(
							(info) =>
								`{"timestamp":"${info.timestamp}", "level":"${info.level}", "message":"${info.message}"}`
						)
					),
				})
			);
			break;
		default:
			transports.push(
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.colorize(),
						winston.format.simple(),
						winston.format.printf(
							(info) => `${info.timestamp} : ${info.label} : ${info.level} : ${info.message}`
						)
					),
				})
			);
			appLogTransports.push(
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.colorize(),
						winston.format.simple(),
						winston.format.printf(
							(info) => `${info.timestamp} : ${info.label} : ${info.level} : ${info.message}`
						)
					),
				})
			);
	}
});
// transports configuration - end

// create loggers and add to winston log container
const container = new winston.Container();

// logger: This logger to be used everywhere in the code/log to log
container.add('logger', {
	level: getEnvValue('LOG_LEVEL'),
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json(),
		winston.format.label({ label: 'logger' })
	),
	// defaultMeta: { service: getEnvValue('APP_NAME') },
	transports,
	levels,
});

// appLogger: This logger must be used to log application (system) or config logs
// appLogger must not be used to log any logic or code
container.add('appLogger', {
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json(),
		winston.format.label({ label: 'appLogger' })
	),
	// defaultMeta: { service: getEnvValue('APP_NAME') },
	transports: appLogTransports,
	levels,
});

// export the logger and appLogger
export const logger = container.get('logger');
export const appLogger = container.get('appLogger');
