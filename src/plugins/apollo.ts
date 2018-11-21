import { Authorizer } from '@/authorizer'
import { AuthError } from '@/errors'
import { User } from '@/types'

/**
 * Wrappers a Resolver with AuthZ
 */
export function apolloAuthZ<U extends User>(
	authorizer: Authorizer,
	fnc: (a, b, c) => any
) {
	return async (x, y, uctx) => {
		if (!authorizer || (!await authorizer.authorize(uctx, []))) {
			throw new AuthError('Unauthorized Access')
		}
		return fnc(x, y, uctx)
	}
}

/**
 * The following context processor passes the Auth Context
 * into the resolvers for later AuthZ
 */
export function apolloContext() {
	return ({ ctx }) => ctx.uctx
}
