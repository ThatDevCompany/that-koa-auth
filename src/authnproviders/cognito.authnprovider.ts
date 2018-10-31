import { AuthToken, User } from '@/models'
import { AuthError } from '@/errors'
import { Credentials } from '@/credentials'
import { AuthNProvider } from './authnprovider'

/**
 * An Authentication Provider for Cognito authentication tokens
 */
export class CognitoAuthNProvider<U extends User, A extends AuthToken>
	implements AuthNProvider<U, A> {
	/**
	 * Authenticate a given set of credentials
	 */
	authenticate(credentials: Credentials): Promise<U> {
		throw new AuthError('CognitoProviderClass.authenticate Not Implemented')
	}
}
