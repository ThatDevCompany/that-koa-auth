import { AuthError } from '@/errors'
import { User, Permission } from '@/models'
import { Context } from '@/context'
import { SecurityDAO } from '@/securitydao'
import { authorize } from '@/utils'

/**
 * Automatically add permission security to a method via a Decorator
 */
export function SecureMethod<U extends User>(
	SecurityDAO: SecurityDAO<U>,
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
		// if (descriptor === undefined) {
		// 	descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)
		// }
		// We replace/wrap the original method
		const originalMethod = descriptor.value

		// The new method
		descriptor.value = async function(uctx: Context, ...args) {
			// Perform Authorization
			if (!(await authorize(SecurityDAO, uctx, permissions))) {
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
