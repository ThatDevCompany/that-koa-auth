import { AuthError } from '@/errors'
import { User, Permission } from '@/types'
import { AuthContext } from '@/authcontext'
import { Authorizer } from '@/authorizer'

/**
 * Automatically add permission security to a method via a Decorator
 */
export function SecureMethod<U extends User, A extends AuthContext<U>>(
	authorizer: Authorizer<U, A>,
	permissions: Permission[]
) {
	/**
	 * The Decorator function itself
	 */
	return function(
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		if (!authorizer) return

		// We replace/wrap the original method
		const originalMethod = descriptor.value

		// The new method
		descriptor.value = async function(auth: A, ...args) {
			// Perform Authorization
			if (!(await authorizer.authorize(auth, permissions))) {
				throw new AuthError('Unauthorized attempt to call ' + propertyKey, {
					auth,
					...args
				})
			}
			return originalMethod.apply(this, [auth].concat(args))
		}

		return descriptor
	}
}
