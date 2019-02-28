import { assert } from 'that-koa-error'
import { AuthError } from '@/errors'
import { AuthCredential, User } from '@/types'
import { Authenticator } from '@/authenticator'
import { AuthContext, AuthContextType } from '@/authcontext'
import { AuthService } from '@/authservice'

/**
 * An interface for an AuthService that provides Authentication
 */
export interface BasicAuthNService<U extends User, C extends AuthCredential>
	extends AuthService {
	findUserMatchingCredentials(cred: C): Promise<U>
}

/**
 * An Authentication Provider for token based auth
 */
export class BasicAuthenticator<
	U extends User,
	C extends AuthCredential,
	A extends AuthContext<U>
> implements Authenticator<U, C, A> {
	/* CONSTRUCTOR */
	constructor(
		protected ContextClass: { new (...args): A },
		protected authNService: BasicAuthNService<U, C>
	) {}

	/**
	 * Authenticate a set of credentials
	 */
	async userContext(cred: C, ...args): Promise<A> {
		// NULL Safety
		assert(cred.identity, 'Missing identity')

		// Find User
		const user: U = await this.authNService.findUserMatchingCredentials(cred)
		const data: any = { identity: cred.identity }

		// Guest
		if (!user) {
			throw new AuthError('User not found')
		}

		// User
		return new this.ContextClass(AuthContextType.USER, user, data, ...args)
	}

	async systemContext(...args): Promise<A> {
		return new this.ContextClass(AuthContextType.SYSTEM, null, null, args)
	}

	async guestContext(...args): Promise<A> {
		return new this.ContextClass(AuthContextType.GUEST, null, null, args)
	}
}
