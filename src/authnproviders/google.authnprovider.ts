import { User, AuthToken } from '@/models'
import { AuthError } from '@/errors'
import { Credentials } from '@/credentials'
import { AuthNProvider } from './authnprovider'

/**
 * An Authentication Provider for Google authentication tokens
 */
export class GoogleAuthNProvider<U extends User, A extends AuthToken>
	implements AuthNProvider<U, A> {
	/**
	 * Authenticate a given set of credentials
	 */
	authenticate(credentials: Credentials): Promise<U> {
		throw new AuthError('GoogleProvider.authenticate Not Implemented')
	}
}
