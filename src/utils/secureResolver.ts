import { SecurityDAO } from '@/securitydao'
import { authorize } from '@/utils/authorize'
import { AuthError } from '@/errors'
import { AuthToken, User } from '@/models'

export function secureResolver<U extends User, A extends AuthToken>(
	securityDAO: SecurityDAO<U, A>,
	fnc: (a, b, c) => any
) {
	return async (x, y, uctx) => {
		if (!(await authorize(securityDAO, uctx, []))) {
			throw new AuthError('Unauthorized Access')
		}
		return fnc(x, y, uctx)
	}
}
