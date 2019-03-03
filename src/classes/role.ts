import { Permission } from './permission'

/**
 * Role
 *
 * A Role is a set of permissions that can be assigned to a User
 */
export class Role<P extends Permission> {
	hasPermission(permission: P): boolean {
		return false
	}
}
