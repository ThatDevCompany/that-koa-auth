import { User } from './user'
import { Role } from './role'
import { Permission } from './permission'

/**
 * User With Roles
 *
 * An extension of the User class which enables
 * basic role based security
 */
export class UserWithRoles<
	P extends Permission,
	R extends Role<P>
> extends User {
	async roles(): Promise<R[]> {
		return []
	}
}
