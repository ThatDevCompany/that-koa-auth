import { AuthError } from '@/errors'
import { User } from '@/types'
import { AuthService } from '@/authservice'
import { Context } from '@/context'
import { Authenticator } from '@/authenticator'

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authentication
 */
export interface PasswordAuthNUser extends User {
	passwordMatches?(passkey: string): Promise<boolean>
}

export interface PasswordAuthNService<U extends PasswordAuthNUser>
	extends AuthService {
	findUserByIdentity(tenantId: string, identity: string): Promise<U>
}

/**
 * An Authentication Provider for Username + Password auth
 */
export class PasswordAuthenticator<U extends PasswordAuthNUser>
	implements Authenticator<U> {
	constructor(private auth: PasswordAuthNService<U>) {}

	/**
	 * Authenticate a KOA request context
	 */
	async authenticate(ctx: any): Promise<U> {
		let user: U

		// Find User by their identity
		user = await this.auth.findUserByIdentity(
			ctx.request.body.tenantId,
			ctx.request.body.identity
		)

		// Was the User found?
		if (!user) {
			throw new AuthError('User not found')
		}

		// Does the User's password match?
		if (!(await user.passwordMatches(ctx.request.body.passkey))) {
			throw new AuthError('Passwords did not match')
		}

		// We are authenticated
		return user
	}
}
