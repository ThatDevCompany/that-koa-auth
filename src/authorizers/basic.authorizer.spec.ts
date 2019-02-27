import {
	BasicAuthorizer,
	BasicAuthZService,
	BasicAuthZRole
} from './basic.authorizer'
import { User, Tenant } from '@/types'
import { AuthContext } from '@/authcontext'

/**
 * BasicAuthorizer
 */
describe('BasicAuthorizer', () => {
	let auth: BasicAuthZService<User, Tenant, BasicAuthZRole> = {
			getRolesForContext(auth: AuthContext<User, Tenant>): Promise<BasicAuthZRole[]> {
				return [] as any
			}
		},
		authGoodRoles: BasicAuthZService<User, Tenant, BasicAuthZRole> = {
			getRolesForContext(auth: AuthContext<User, Tenant>): Promise<BasicAuthZRole[]> {
				return [
					{
						hasPermission: () => true
					}
				] as any
			}
		},
		authBadRoles: BasicAuthZService<User, Tenant, BasicAuthZRole> = {
			getRolesForContext(auth: AuthContext<User, Tenant>): Promise<BasicAuthZRole[]> {
				return [
					{
						hasPermission: () => false
					}
				] as any
			}
		}
	let testTenant = { id: '1234' }
	let res

	it('should be instantiable', async () => {
		expect(new BasicAuthorizer(auth)).toBeDefined()
	})

	it('should not authorize if missing context', async () => {
		res = await new BasicAuthorizer(auth).authorize(null, [])
		expect(res).toBeFalsy()
	})

	it('should return true if user or system context and no permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(AuthContext.System<User, Tenant>(), [])
		expect(res).toBeTruthy()
		res = await new BasicAuthorizer(auth).authorize(AuthContext.User<User, Tenant>(testTenant), [])
		expect(res).toBeTruthy()
	})

	it('should return true if system needing permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(AuthContext.System<User, Tenant>(), [{}])
		expect(res).toBeTruthy()
	})

	it('should return false if guest needing permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(AuthContext.Guest<User, Tenant>(), [{}])
		expect(res).toBeFalsy()
	})

	it('should return false if user needs permissions but has no roles', async () => {
		res = await new BasicAuthorizer(auth).authorize(AuthContext.User<User, Tenant>(testTenant), [{}])
		expect(res).toBeFalsy()
	})

	it('should return false if user needs permissions but doesnt have them', async () => {
		res = await new BasicAuthorizer(authBadRoles).authorize(
			AuthContext.User<User, Tenant>(testTenant),
			[{}]
		)
		expect(res).toBeFalsy()
	})

	it('should return true  if user has needed permissions', async () => {
		res = await new BasicAuthorizer(authGoodRoles).authorize(
			AuthContext.User<User, Tenant>(testTenant),
			[{}]
		)
		expect(res).toBeTruthy()
	})
})
