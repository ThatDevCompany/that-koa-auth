import { User } from '@/models'
import { AuthError } from '@/errors'
import { Credentials } from '@/credentials'
import { AuthNProvider } from './authnprovider'

/**
 * An Authentication Provider for Cognito authentication tokens
 */
export class CognitoAuthNProvider extends AuthNProvider {
	/**
	 * Authenticate a given set of credentials
	 */
	authenticate(credentials: Credentials): Promise<User> {
		throw new AuthError('CognitoProviderClass.authenticate Not Implemented')
	}
}
