import { ApplicationError } from 'that-koa-error'

/**
 * An Authentication Error
 */
export class AuthError extends ApplicationError {
	constructor(
		public debugMessage: string = 'No debug information provided',
		public debugInfo: any = {}
	) {
		super(401, 'Authentication Failed', 'ERROR in that-koa-dev: ' + debugMessage, debugInfo)
	}
}
