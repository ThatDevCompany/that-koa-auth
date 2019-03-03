import { AuthError } from '@/errors'
import * as C from '@/classes'

/**
 * Wrappers a Resolver with AuthZ
 */
export function apolloAuthZ<U extends C.User, V extends C.VISA<U>>(
	authorize: (visa: V, ...args) => Promise<boolean>,
	fnc: (a, b, c) => any,
	...args
) {
	return async (x, y, visa) => {
		if (!authorize || !(await authorize(visa, args))) {
			throw new AuthError('Unauthorized Access')
		}
		return fnc(x, y, visa)
	}
}

/**
 * The following context processor passes the Auth Context
 * into the resolvers for later AuthZ
 */
export function apolloContext() {
	return ({ ctx }) => ctx.visa
}
