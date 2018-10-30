import { User } from '@/models'
import { AuthError } from '@/errors'
import { Credentials } from '@/credentials'
import { AuthNProvider } from './authnprovider'

/**
 * An Authentication Provider for Google authentication tokens
 */
export class GoogleAuthNProvider extends AuthNProvider {
	/**
	 * Authenticate a given set of credentials
	 */
	authenticate(credentials: Credentials): Promise<User> {
		throw new AuthError('GoogleProvider.authenticate Not Implemented')
	}
}
