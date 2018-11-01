import { User } from '@/types'
import { AuthError } from '@/errors'
import { Authenticator } from '@/authenticator'

/**
 * An Authentication Provider for Cognito authentication tokens
 */
export class CognitoAuthenticator<U extends User> implements Authenticator<U> {
	/**
	 * Authenticate a KOA request context
	 */
	authenticate(ctx: any): Promise<{ user: U }> {
		throw new AuthError('CognitoProviderClass.authenticate Not Implemented')
	}
}
