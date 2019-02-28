import { AuthContext } from '@/authcontext'
import { AuthCredential, User } from '@/types'
import { Authenticator } from '@/authenticator'

/**
 * Koa Auth Credential Generator
 */
export interface KoaCredGenerator<C extends AuthCredential> {
	generateCredentialFromKoaContext(ctx: any): C
}

export class BasicKoaCredGenerator implements KoaCredGenerator<AuthCredential> {
	generateCredentialFromKoaContext(ctx: any): AuthCredential {
		let identity = (
			ctx.headers['x-api-key'] ||
			ctx.headers['authorization'] ||
			ctx.query.token ||
			''
		)
			.split('Basic ')
			.join('')
			.split('Bearer ')
			.join('')

		return { identity } as AuthCredential
	}
}

/**
 * This middleware performs Authentication
 * It will attach a special Auth Context to the Request Context
 * Based on the AuthToken Id provided via request headers or the query string
 */
export function koaAuthN<
	U extends User,
	C extends AuthCredential,
	A extends AuthContext<U>
>(credGenerator: KoaCredGenerator<C>, authenticator: Authenticator<U, C, A>) {
	return async (ctx, next) => {
		let auth: A

		// Attempt to Create Context from the Credentials Provided
		try {
			auth = await authenticator.userContext(
				credGenerator.generateCredentialFromKoaContext(ctx)
			)

			// Catch Errors
		} catch (e) {
			auth = await authenticator.guestContext()
		}

		// Attach Context
		ctx.auth = auth

		// Carry on
		return await next()
	}
}
