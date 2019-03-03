import * as C from '@/classes'
import { VISAType } from '@/classes'
import * as _ from 'lodash'

/**
 * ctxToPassport
 *
 * Create a Passport from a Koa Context
 */
export function ctxToPassport(ctx: any): C.Passport {
	let p = new C.Passport()
	p.identity = (
		_.get(ctx, 'headers.x-api-key') ||
		_.get(ctx, 'headers.authorization') ||
		_.get(ctx, 'query.token') ||
		''
	)
		.split('Basic ')
		.join('')
		.split('Bearer ')
		.join('')
	return p
}

/**
 * This middleware performs Authentication
 * It will attach a special Auth Context to the Request Context
 * Based on the AuthToken Id provided via request headers or the query string
 */
export function koaAuthN<
	U extends C.User,
	P extends C.Passport,
	V extends C.VISA<U>
>(
	VISA: C.VISAClass<U, V>,
	ctxToPassport: (ctx: any) => P,
	authenticate: (passport: P) => Promise<V>
) {
	return async (ctx, next) => {
		let visa: V

		// Attempt to Create Context from the Credentials Provided
		try {
			visa = await authenticate(ctxToPassport(ctx))

			// Null response safety
			if (!visa) {
				visa = new VISA(VISAType.GUEST)
			}

			// Catch Errors
		} catch (e) {
			visa = new VISA(VISAType.GUEST)
		}

		// Attach Context
		ctx.visa = visa

		// Carry on
		return await next()
	}
}
