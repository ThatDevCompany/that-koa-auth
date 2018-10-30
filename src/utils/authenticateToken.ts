import { assert } from 'that-koa-error'
import { Context, ContextType } from '../context'
import { SecurityDAO } from '../securitydao'
import { AuthError } from '../errors/auth.error'

export function authenticateToken(
	SecurityDAO: SecurityDAO,
	token: string
): Promise<Context> {
	// Null safety
	assert(SecurityDAO, 'authenticateToken - missing parameter SecurityDAO')
	assert(token, 'authenticateToken - missing parameter token')

	// Find Auth Token
	return SecurityDAO.findAuthTokenById(token).then(authToken => {
		// If no authtoken was found with that Id
		if (!authToken) {
			throw new AuthError('Token not found', { token })
		}

		// If the authtoken is not valid (e.g. it has expired)
		if (!authToken.isValid()) {
			throw new AuthError('Token not valid', { authToken })
		}

		// Return an auth context
		return new Context(ContextType.USER, authToken.userId, authToken.tenantId)
	})
}
