import { assert } from 'that-koa-error'
import { AuthError } from '@/errors'
import { User, Credentials, Tenant } from '@/types'
import { AuthService } from '@/authservice'
import { Authenticator } from '@/authenticator'
import { AuthContext } from '@/authcontext'

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authentication
 */
export interface TokenAuthNService<U extends User, T extends Tenant>
	extends AuthService {
	findUserByToken(token: string, tenant?: T): Promise<U>
}

/**
 * An Authentication Provider for token based auth
 */
export class TokenAuthenticator<U extends User, T extends Tenant>
	implements Authenticator<U, T> {
	constructor(private auth: TokenAuthNService<U, T>) {}

	/**
	 * Authenticate a KOA request context
	 */
	async generateAuthContext(
		credentials: Credentials<T>
	): Promise<AuthContext<U, T>> {
		// NULL Safety
		assert(credentials.identity, 'Missing token')

		const user: U = await this.auth.findUserByToken(
			credentials.identity,
			credentials.tenant
		)

		const data: any = { token: credentials.identity }

		// Guest
		if (!user) {
			throw new AuthError('User not found')
		}

		// User
		return AuthContext.User(user, credentials.tenant, data)
	}
}
