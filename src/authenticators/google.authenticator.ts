import { User } from '@/types'
import { AuthError } from '@/errors'
import { Authenticator } from '@/authenticator'

/**
 * An Authentication Provider for Google authentication tokens
 */
export class GoogleAuthenticator<U extends User> implements Authenticator<U> {
	/**
	 * Authenticate a KOA request context
	 */
	authenticate(ctx: any): Promise<U> {
		throw new AuthError('GoogleProvider.authenticate Not Implemented')
	}
}
