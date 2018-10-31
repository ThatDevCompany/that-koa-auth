import { User, AuthToken } from '@/models'
import { AuthError } from '@/errors'
import { Credentials } from '@/credentials'
import { AuthNProvider } from './authnprovider'

/**
 * An Authentication Provider for Facebook authentication tokens
 */
export class FacebookAuthNProvider<U extends User, A extends AuthToken>
	implements AuthNProvider<U, A> {
	/**
	 * Authenticate a given set of credentials
	 */
	authenticate(credentials: Credentials): Promise<U> {
		throw new AuthError('FacebookProviderClass.authenticate Not Implemented')
	}
}
