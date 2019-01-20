import { ApplicationError } from 'that-koa-error'

/**
 * An Authentication Error
 */
export class AuthError extends ApplicationError {
	constructor(
		authErrorMessage: string = 'No debug information provided',
		authErrorInfo: any = {}
	) {
		super(401, 'Authentication Error - ' + authErrorMessage, '', authErrorInfo)
	}
}
