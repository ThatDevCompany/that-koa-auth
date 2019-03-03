import * as C from '@/classes'

/**
 * A simple roles and permissions authorizer
 */
export async function authorize<
	P extends C.Permission,
	R extends C.Role<P>,
	U extends C.UserWithRoles<P, R>,
	V extends C.VISA<U>
>(visa: V, permissions: P[]): Promise<boolean> {
	// NULL Safety
	if (!visa) {
		return false
	}

	// If no permissions are specified,
	// then authorization is NOT granted to GUESTS
	if (!permissions || !permissions.length) {
		return visa.isUser || visa.isSystem
	}

	// System Users always have permissions
	if (visa.isSystem) {
		return true
	}

	// Guests never have permissions
	if (visa.isGuest) {
		return false
	}

	// Load the User
	const roles = await visa.user.roles()

	// Fail if there is a required permission that
	// is not met by any of the user's roles
	if (permissions.some(p => !roles.some(r => r.hasPermission(p)))) {
		return false
	}

	// All is well
	return true
}
