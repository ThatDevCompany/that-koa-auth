import { SecurityDAO } from '@/securitydao'
import { authorize } from '@/utils/authorize'
import { AuthError } from '@/errors'
import { User } from '@/models'

export function secureResolver<U extends User>(
	securityDAO: SecurityDAO<U>,
	fnc: (a, b, c) => any
) {
	return async (x, y, uctx) => {
		if (!(await authorize(securityDAO, uctx, []))) {
			throw new AuthError('Unauthorized Access')
		}
		return fnc(x, y, uctx)
	}
}
