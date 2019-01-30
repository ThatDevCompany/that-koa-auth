import { ApplicationError } from 'that-koa-error'

/**
 * An Authentication Error
 */
export class AuthError extends ApplicationError {
	constructor(
		authErrorMessage: string = 'Authentication Failed',
		authErrorInfo: any = {}
	) {
		super(401, authErrorMessage, '', authErrorInfo)
	}
}
