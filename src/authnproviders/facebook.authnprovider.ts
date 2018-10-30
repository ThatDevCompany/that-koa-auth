import { User } from '@/models'
import { AuthError } from '@/errors'
import { Credentials } from '@/credentials'
import { AuthNProvider } from './authnprovider'

/**
 * An Authentication Provider for Facebook authentication tokens
 */
export class FacebookAuthNProvider extends AuthNProvider {
	/**
	 * Authenticate a given set of credentials
	 */
	authenticate(credentials: Credentials): Promise<User> {
		throw new AuthError('FacebookProviderClass.authenticate Not Implemented')
	}
}
