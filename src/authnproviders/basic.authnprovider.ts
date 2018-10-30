import { User } from '@/models'
import { AuthError } from '@/errors'
import { Credentials } from '@/credentials'
import { AuthNProvider } from './authnprovider'

/**
 * An Authentication Provider for basic auth (Username + Password)
 */
export class BasicAuthNProvider extends AuthNProvider {
	/* METHODS */
	/**
	 * Authenticate a given set of credentials
	 */
	async authenticate(credentials: Credentials): Promise<User> {
		let user: User

		// Find User with that username within the Tenant space for the Client
		try {
			user = await this.SecurityDAO.findUserByIdentity(
				credentials.tenantId,
				credentials.identity
			)

			// Catch any Errors
		} catch (err) {
			throw new AuthError('Unexpected Error', { credentials, err })
		}

		// Was the User found?
		if (!user) {
			throw new AuthError('User not found', credentials)
		}

		// Does the User's password match?
		if (!(await user.passkeyMatches(credentials.passkey))) {
			throw new AuthError('passkey did not match', credentials)
		}

		// We are authenticated
		return user
	}
}
