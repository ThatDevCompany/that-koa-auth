import {BasicAuthorizer, BasicAuthZService} from './basic.authorizer'
import {Permission, Role, User} from '@/types'
import {AuthContext, AuthContextType} from '@/authcontext'

/**
 * BasicAuthorizer
 */
describe('BasicAuthorizer', () => {
	let auth: BasicAuthZService<User, Role, Permission, AuthContext<User>> = {
			getRolesFromAuthContext(
				auth: AuthContext<User>
			): Promise<Role[]> {
				return [] as any
			}
		},
		authGoodRoles: BasicAuthZService<User, Role, Permission, AuthContext<User>> = {
			getRolesFromAuthContext(
				auth: AuthContext<User>
			): Promise<Role[]> {
				return [
					{
						hasPermission: () => true
					}
				] as any
			}
		},
		authBadRoles: BasicAuthZService<User, Role, Permission, AuthContext<User>> = {
			getRolesFromAuthContext(
				auth: AuthContext<User>
			): Promise<Role[]> {
				return [
					{
						hasPermission: () => false
					}
				] as any
			}
		}
	let testUser = { id: '1234' }
	let res

	it('should be instantiable', async () => {
		expect(new BasicAuthorizer(auth)).toBeDefined()
	})

	it('should not authorize if missing context', async () => {
		res = await new BasicAuthorizer(auth).authorize(null, [])
		expect(res).toBeFalsy()
	})

	it('should return true if user or system context and no permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(
			new AuthContext(AuthContextType.SYSTEM),
			[]
		)
		expect(res).toBeTruthy()
		res = await new BasicAuthorizer(auth).authorize(
			new AuthContext(AuthContextType.USER, testUser),
			[]
		)
		expect(res).toBeTruthy()
	})

	it('should return true if system needing permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(
			new AuthContext(AuthContextType.SYSTEM),
			[{}]
		)
		expect(res).toBeTruthy()
	})

	it('should return false if guest needing permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(
			new AuthContext(AuthContextType.USER, testUser),
			[{}]
		)
		expect(res).toBeFalsy()
	})

	it('should return false if user needs permissions but has no roles', async () => {
		res = await new BasicAuthorizer(auth).authorize(
			new AuthContext(AuthContextType.USER, testUser),
			[{}]
		)
		expect(res).toBeFalsy()
	})

	it('should return false if user needs permissions but doesnt have them', async () => {
		res = await new BasicAuthorizer(authBadRoles).authorize(
			new AuthContext(AuthContextType.USER, testUser),
			[{}]
		)
		expect(res).toBeFalsy()
	})

	it('should return true  if user has needed permissions', async () => {
		res = await new BasicAuthorizer(authGoodRoles).authorize(
			new AuthContext(AuthContextType.USER, testUser),
			[{}]
		)
		expect(res).toBeTruthy()
	})
})
