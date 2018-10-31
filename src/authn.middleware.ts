import { SecurityDAO } from '@/securitydao'
import { Context, ContextType } from '@/context'
import { AuthError } from '@/errors/auth.error'
import { User, AuthToken } from '@/models'

/**
 * This middleware performs Authentication
 * It will attach a special Auth Context to the Request Context
 * Based on the AuthToken Id provided via request headers or the query string
 */
export function authn<U extends User, A extends AuthToken>(
	SecurityDAO: SecurityDAO<U, A>
) {
	return async (ctx, next) => {
		let uctx: Context

		// Attempt to Create Context from Token Id
		try {
			// Get Token from header or querystring
			const tokenId = (
				ctx.headers['x-api-key'] ||
				ctx.headers['authorization'] ||
				ctx.query.token ||
				''
			)
				.split('Basic ')
				.join('')
				.split('Bearer ')
				.join('')

			// Set the auth property of the context
			let authToken = await SecurityDAO.findAuthTokenById(tokenId)

			// If no valid authtoken was found
			if (!authToken || !authToken.isValid()) {
				uctx = Context.Guest()
			}

			// Otherwise
			else {
				uctx = Context.User(authToken.userId, authToken.tenantId)
			}

			// Catch Errors
		} catch (e) {
			uctx = Context.Guest()
		}

		// Attach Context
		ctx.uctx = uctx

		// Carry on
		return await next()
	}
}
