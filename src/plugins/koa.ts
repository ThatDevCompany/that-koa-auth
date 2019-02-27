import { AuthContext } from '@/authcontext'
import { User, Tenant } from '@/types'
import { Authenticator } from '@/authenticator'

/**
 * This middleware performs Authentication
 * It will attach a special Auth Context to the Request Context
 * Based on the AuthToken Id provided via request headers or the query string
 */
export function koaAuthN<U extends User, T extends Tenant>(authenticator: Authenticator<U, T>) {
	return async (ctx, next) => {
		let auth: AuthContext<U, T>

		// Attempt to Create Context from Token Id
		try {
			const identity = (
				ctx.headers['x-api-key'] ||
				ctx.headers['authorization'] ||
				ctx.query.token ||
				''
			)
				.split('Basic ')
				.join('')
				.split('Bearer ')
				.join('')

			const tenant = null

			auth = await authenticator.generateAuthContext({ identity, tenant })

			// Catch Errors
		} catch (e) {
			auth = AuthContext.Guest()
		}

		// Attach Context
		ctx.auth = auth

		// Carry on
		return await next()
	}
}
