import { assert } from 'that-koa-error'
import { AuthError } from '@/errors'
import {User, Tenant, Credentials} from '@/types'
import { AuthService } from '@/authservice'
import { AuthContext } from '@/authcontext'
import { Authenticator } from '@/authenticator'

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authentication
 */
export interface PasswordAuthNUser extends User {
	passwordMatches?(passkey: string): Promise<boolean>
}

export interface PasswordAuthNService<U extends PasswordAuthNUser, T extends Tenant>
	extends AuthService {
	findUserByIdentity(identity: string, tenant?: T): Promise<U>
}

/**
 * An Authentication Provider for Username + Password auth
 */
export class PasswordAuthenticator<U extends PasswordAuthNUser, T extends Tenant>
	implements Authenticator<U, T> {
	constructor(private auth: PasswordAuthNService<U, T>) {}

	/**
	 * Authenticate a KOA request context
	 */
	async generateAuthContext(credentials: Credentials<T>): Promise<AuthContext<U, T>> {
		// NULL Safety
		assert(credentials.identity, 'Missing token')

		// Find User
		const user: U = await this.auth.findUserByIdentity(credentials.identity, credentials.tenant)

		// Was the User found?
		if (!user) {
			throw new AuthError('User not found')
		}

		// Does the User's password match?
		if (!(await user.passwordMatches(credentials.passkey))) {
			throw new AuthError('Passwords did not match')
		}

		// We are authenticated
		return AuthContext.User<U, T>(user, credentials.tenant, {})
	}
}
