import { Credentials } from '@/credentials'
import { Context, ContextType } from '@/context'
import * as P from '@/authnproviders'
import { AuthError } from '@/errors'
import { SecurityDAO } from '@/securitydao'
import { User } from '@/models'

export async function authenticateCredentials(
	SecurityDAO: SecurityDAO,
	credentials: Credentials
): Promise<Context> {
	let user: User

	// Authenticate Credentials and get User
	switch (credentials.provider) {
		case P.AuthProviderType.COGNITO:
			user = await new P.CognitoAuthNProvider(SecurityDAO).authenticate(
				credentials
			)
			break

		case P.AuthProviderType.GOOGLE:
			user = await new P.GoogleAuthNProvider(SecurityDAO).authenticate(
				credentials
			)
			break

		case P.AuthProviderType.FACEBOOK:
			user = await new P.FacebookAuthNProvider(SecurityDAO).authenticate(
				credentials
			)
			break

		case P.AuthProviderType.BASIC:
			user = await new P.BasicAuthNProvider(SecurityDAO).authenticate(
				credentials
			)
			break

		default:
			throw new AuthError(
				'authenticateCredentials received invalid Provider',
				credentials
			)
	}

	// User not found
	if (!user) {
		throw new AuthError('authenticateCredentials user not found', credentials)
	}

	// Return a context for the user
	return new Context(ContextType.USER, user.id, user.tenantId)
}
