const styles = {
	info: 'background: #2563eb; color: #ffffff; padding: 2px 6px; border-radius: 4px;',

	error: 'background: #dc2626; color: #ffffff; padding: 2px 6px; border-radius: 4px;',

	debug: 'background: #7c3aed; color: #ffffff; padding: 2px 6px; border-radius: 4px;',
}

export const logger = {
	info: (...args: unknown[]): void => {
		console.info('%cINFO', styles.info, ...args)
	},

	error: (...args: unknown[]): void => {
		console.error('%cERROR', styles.error, ...args)
	},

	debug: (...args: unknown[]): void => {
		if (process.env.NODE_ENV === 'development') {
			console.debug('%cDEBUG', styles.debug, ...args)
		}
	},
}
