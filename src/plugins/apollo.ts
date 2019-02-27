import { Authorizer } from '@/authorizer'
import { AuthContext } from '@/authcontext'
import { AuthError } from '@/errors'
import { User } from '@/types'

/**
 * Wrappers a Resolver with AuthZ
 */
export function apolloAuthZ<U extends User, A extends AuthContext<U>>(
	authorizer: Authorizer<U, A>,
	fnc: (a, b, c) => any
) {
	return async (x, y, auth) => {
		if (!authorizer || !(await authorizer.authorize(auth, []))) {
			throw new AuthError('Unauthorized Access')
		}
		return fnc(x, y, auth)
	}
}

/**
 * The following context processor passes the Auth Context
 * into the resolvers for later AuthZ
 */
export function apolloContext() {
	return ({ ctx }) => ctx.auth
}
