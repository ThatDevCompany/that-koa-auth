import {assert} from 'that-koa-error'
import {AuthError} from '@/errors'
import {AuthCredential, Tenant, User} from '@/types'
import {AuthService} from '@/authservice'
import {Authenticator} from '@/authenticator'
import {AuthContext, AuthContextType} from '@/authcontext'

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authentication
 */
export interface BasicAuthNService<
	U extends User,
	C extends AuthCredential
> extends AuthService {
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
		protected auth: BasicAuthNService<U, C>
	) {}

	/**
	 * Authenticate a set of credentials
	 */
	async generateAuthContext(cred: C): Promise<A> {
		// NULL Safety
		assert(cred.identity, 'Missing identity')

		// Find User
		const user: U = await this.auth.findUserMatchingCredentials(cred)
		const data: any = { token: cred.identity }

		// Guest
		if (!user) {
			throw new AuthError('User not found')
		}

		// User
		return (new AuthContext(AuthContextType.USER, user, data)) as A
	}

	async generateGuestContext(): Promise<A> {
		return (new AuthContext<User>()) as A
	}
}
