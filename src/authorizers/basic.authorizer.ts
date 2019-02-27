import { User, Permission, Role, Tenant } from '@/types'
import { AuthContext } from '@/authcontext'
import { AuthService } from '@/authservice'
import { Authorizer } from '@/authorizer'

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authorization
 */
export interface BasicAuthZService<
	U extends User,
	R extends Role,
	P extends Permission,
	A extends AuthContext<U>
> extends AuthService {
	getRolesFromAuthContext(auth: A): Promise<R[]>
}

/**
 * A simple roles and permissions authorizer
 */
export class BasicAuthorizer<
	U extends User,
	R extends Role,
	P extends Permission,
	A extends AuthContext<U>
> implements Authorizer<U, A> {
	constructor(
		private auth: BasicAuthZService<U, R, P, A>
	) {}

	async authorize(auth: A, permissions: P[]
	): Promise<boolean> {
		// NULL Safety
		if (!auth) {
			return false
		}

		// If no permissions are specified,
		// then authorization is NOT granted to GUESTS
		if (!permissions || !permissions.length) {
			return auth.isUser || auth.isSystem
		}

		// System Users always have permissions
		if (auth.isSystem) {
			return true
		}

		// Guests never have permissions
		if (auth.isGuest) {
			return false
		}

		// Load the User
		const roles = await this.auth.getRolesFromAuthContext(auth)

		// Fail if there is a required permission that
		// is not met by any of the user's roles
		if (permissions.some(p => !roles.some(r => r.hasPermission(p)))) {
			return false
		}

		// All is well
		return true
	}
}
