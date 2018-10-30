import { SecurityDAO } from '@/securitydao'
import { authenticateToken } from '@/utils'

/**
 * This middleware performs Authentication
 * It will attach a special Auth Context to the Request Context
 * Based on the AuthToken Id provided via request headers or the query string
 */
export function authn(SecurityDAO: SecurityDAO) {
	return async (ctx, next) => {
		// Get Token from header or querystring
		const token = (
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
		ctx.uctx = await authenticateToken(SecurityDAO, token)

		// Carry on
		return await next()
	}
}
