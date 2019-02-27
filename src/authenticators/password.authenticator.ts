import { assert } from 'that-koa-error'
import { AuthError } from '@/errors'
import {User, AuthCredential} from '@/types'
import {AuthContext, AuthContextType} from '@/authcontext'
import {BasicAuthenticator, BasicAuthNService} from "@/authenticators/basic.authenticator";

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authentication
 */
export interface PasswordAuthNUser extends User {
	passwordMatches?(passkey: any): Promise<boolean>
}

export interface PasswordAuthCredential extends AuthCredential {
	passkey: any
}

/**
 * An Authentication Provider for Username + Password auth
 */
export class PasswordAuthenticator<
	U extends PasswordAuthNUser,
	C extends PasswordAuthCredential,
	A extends AuthContext<U>
> extends BasicAuthenticator<U, C, A> {

	constructor(
		protected auth: BasicAuthNService<U, C>
	) {
		super(auth)
	}

	/**
	 * Authenticate a KOA request context
	 */
	async generateAuthContext(cred: C): Promise<A> {
		// NULL Safety
		assert(cred.identity, 'Missing identity')
		assert(cred.passkey, 'Missing passkey')

		// Find User
		const user: U = await this.auth.findUserMatchingCredentials(cred)
		const data: any = { token: cred.identity }

		// Guest
		if (!user) {
			throw new AuthError('User not found')
		}

		// Does the User's password match?
		if (!(await user.passwordMatches(cred.passkey))) {
			throw new AuthError('Passwords did not match')
		}

		// User
		return (new AuthContext(AuthContextType.USER, user, data)) as A
	}
}
