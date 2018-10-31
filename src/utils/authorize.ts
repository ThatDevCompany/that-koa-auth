import { User, Permission } from '@/models'
import { Context } from '@/context'
import { SecurityDAO } from '@/securitydao'

export async function authorize<U extends User>(
	SecurityDAO: SecurityDAO<U>,
	uctx: Context,
	permissions: Array<Permission>
): Promise<boolean> {
	// NULL Safety
	if (!SecurityDAO || !uctx) {
		return false
	}

	// If no permissions are specified,
	// then authorization is NOT granted to GUESTS
	if (!permissions || !permissions.length) {
		return !uctx.isGuest
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
	const user = await SecurityDAO.findUserById(uctx.tenantId, uctx.userId)
	const roles = await user.roles()

	// Fail if there is a required permission that
	// is not met by any of the user's roles
	if (permissions.some(p => !roles.some(r => r.hasPermission(p)))) {
		return false
	}

	// All is well
	return true
}
