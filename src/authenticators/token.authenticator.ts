import { AuthError } from '@/errors'
import { User, Credentials } from '@/types'
import { AuthService } from '@/authservice'
import { Context } from '@/context'
import { Authenticator } from '@/authenticator'

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authentication
 */
export interface TokenAuthNService<U extends User> extends AuthService {
	findUserByToken(token: string): Promise<U>
}

/**
 * An Authentication Provider for token based auth
 */
export class TokenAuthenticator<U extends User> implements Authenticator<U> {
	constructor(private auth: TokenAuthNService<U>) {}

	/**
	 * Authenticate a KOA request context
	 */
	async authenticate(ctx: any): Promise<{ user: U; data: any }> {
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

		return {
			user: await this.auth.findUserByToken(token),
			data: { token }
		}
	}
}
