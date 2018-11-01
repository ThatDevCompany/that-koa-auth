import { User, Permission, Role } from '@/types'
import { Context } from '@/context'
import { AuthService } from '@/authservice'
import { Authorizer } from '@/authorizer'

/**
 * An interface for an AuthService that provides all the necessary
 * methods for Basic authorization
 */

export interface BasicAuthZRole extends Role {
	hasPermission(permission: Permission): boolean
}

export interface BasicAuthZService<R extends BasicAuthZRole>
	extends AuthService {
	getRolesForContext(uctx: Context): Promise<Array<R>>
}

/**
 * A simple roles and permissions authorizer
 */
export class BasicAuthorizer<R extends BasicAuthZRole> implements Authorizer {
	constructor(private auth: BasicAuthZService<R>) {}

	async authorize(
		uctx: Context,
		permissions: Array<Permission>
	): Promise<boolean> {
		// NULL Safety
		if (!uctx || !(uctx instanceof Context)) {
			return false
		}

		// If no permissions are specified,
		// then authorization is NOT granted to GUESTS
		if (!permissions || !permissions.length) {
			return uctx.isUser || uctx.isSystem
		}

		// System Users always have permissions
		if (uctx.isSystem) {
			return true
		}

		// Guests never have permissions
		if (uctx.isGuest) {
			return false
		}

		// Load the User
		const roles = await this.auth.getRolesForContext(uctx)

		// Fail if there is a required permission that
		// is not met by any of the user's roles
		if (permissions.some(p => !roles.some(r => r.hasPermission(p)))) {
			return false
		}

		// All is well
		return true
	}
}
