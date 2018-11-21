import { AuthError } from '@/errors'
import { User, Permission } from '@/types'
import { Context } from '@/context'
import { Authorizer } from '@/authorizer'

/**
 * Automatically add permission security to a method via a Decorator
 */
export function SecureMethod<U extends User>(
	authorizer: Authorizer,
	permissions: Array<Permission>
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
		descriptor.value = async function(uctx: Context, ...args) {
			// Perform Authorization
			if (!(await authorizer.authorize(uctx, permissions))) {
				throw new AuthError('Unauthorized attempt to call ' + propertyKey, {
					uctx,
					...args
				})
			}
			return originalMethod.apply(this, [uctx].concat(args))
		}

		return descriptor
	}
}
