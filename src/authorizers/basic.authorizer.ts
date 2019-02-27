import { User, Permission, Role, Tenant } from '@/types'
import { AuthContext } from '@/authcontext'
import { AuthService } from '@/authservice'
import { Authorizer } from '@/authorizer'

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authorization
 */

export interface BasicAuthZRole extends Role {
	hasPermission(permission: Permission): boolean
}

export interface BasicAuthZService<U extends User, T extends Tenant, R extends BasicAuthZRole>
	extends AuthService {
	getRolesForContext(auth: AuthContext<U, T>): Promise<R[]>
}

/**
 * A simple roles and permissions authorizer
 */
export class BasicAuthorizer<U extends User, T extends Tenant, R extends BasicAuthZRole> implements Authorizer<U, T> {
	constructor(private auth: BasicAuthZService<U, T, R>) {}

	async authorize(
		auth: AuthContext<U, T>,
		permissions: Permission[]
	): Promise<boolean> {
		// NULL Safety
		if (!auth || !(auth instanceof AuthContext)) {
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
		const roles = await this.auth.getRolesForContext(auth)

		// Fail if there is a required permission that
		// is not met by any of the user's roles
		if (permissions.some(p => !roles.some(r => r.hasPermission(p)))) {
			return false
		}

		// All is well
		return true
	}
}
