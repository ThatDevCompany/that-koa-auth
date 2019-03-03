import { AuthError } from '@/errors'
import * as C from '@/classes'

/**
 * Automatically add permission security to a method via a Decorator
 */
export function SecureMethod<
	U extends C.User,
	V extends C.VISA<U>,
	P extends C.Permission
>(
	authorize: (visa: V, permissions: P[]) => Promise<boolean>,
	permissions: P[]
) {
	/**
	 * The Decorator function itself
	 */
	return function(
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		if (!authorize) return

		// We replace/wrap the original method
		const originalMethod = descriptor.value

		// The new method
		descriptor.value = async function(visa: V, ...args) {
			// Perform Authorization
			if (!(await authorize(visa, permissions))) {
				throw new AuthError('Unauthorized attempt to call ' + propertyKey, {
					visa,
					...args
				})
			}
			return originalMethod.apply(this, [visa].concat(args))
		}

		return descriptor
	}
}
