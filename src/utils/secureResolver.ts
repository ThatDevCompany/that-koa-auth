import { SecurityDAO } from '@/securitydao'
import { authorize } from '@/utils/authorize'
import { AuthError } from '@/errors'

export function secureResolver(
	securityDAO: SecurityDAO,
	fnc: (a, b, c) => any
) {
	return async (x, y, uctx) => {
		if (!(await authorize(securityDAO, uctx, []))) {
			throw new AuthError('Unauthorized Access')
		}
		return fnc(x, y, uctx)
	}
}
