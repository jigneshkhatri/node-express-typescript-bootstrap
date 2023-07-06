export default class Logger {
	public static readonly info = (message: string): void => {
		const now = new Date().toISOString();
		console.info(`${now} : INFO : ${message}`);
	};

	public static readonly debug = (message: string): void => {
		const now = new Date().toISOString();
		console.debug(`${now} : DEBUG : ${message}`);
	};

	public static readonly warn = (message: string): void => {
		const now = new Date().toISOString();
		console.warn(`${now} : WARN : ${message}`);
	};

	public static readonly error = (message: string): void => {
		const now = new Date().toISOString();
		console.error(`${now} : ERROR : ${message}`);
	};
}
