import { User } from '@/types'
import { AuthError } from '@/errors'
import { Authenticator } from '@/authenticator'

/**
 * An Authentication Provider for Facebook authentication tokens
 */
export class FacebookAuthenticator<U extends User> implements Authenticator<U> {
	/**
	 * Authenticate a KOA request context
	 */
	authenticate(ctx: any): Promise<{ user: U }> {
		throw new AuthError('FacebookProviderClass.authenticate Not Implemented')
	}
}
