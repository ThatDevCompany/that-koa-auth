import { SecurityDAO } from '@/securitydao'
import { Context } from '@/context'
import { User } from '@/models'

/**
 * This middleware performs Authentication
 * It will attach a special Auth Context to the Request Context
 * Based on the AuthToken Id provided via request headers or the query string
 */
export function authn<U extends User>(
	SecurityDAO: SecurityDAO<U>
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
			let uctx = await SecurityDAO.contextFromToken(tokenId)

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
