import { AuthService } from '@/authservice'
import { Context } from '@/context'
import { User } from '@/types'
import { Authenticator } from '@/authenticator'

/**
 * This middleware performs Authentication
 * It will attach a special Auth Context to the Request Context
 * Based on the AuthToken Id provided via request headers or the query string
 */
export function koaAuthN<U extends User>(authenticator: Authenticator<U>) {
	return async (ctx, next) => {
		let uctx: Context

		// Attempt to Create Context from Token Id
		try {
			const user = await authenticator.authenticate(ctx)

			if (!user) {
				uctx = Context.Guest()
			} else {
				uctx = Context.User(user.id, user.tenantId)
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
