import { Authorizer, BasicAuthZService } from './basic.authorizer'
import { Permission, Role, User } from '@/types'
import { Context, ContextType } from '@/authcontext'

/**
 * BasicAuthorizer
 */
describe('BasicAuthorizer', () => {
	let auth: BasicAuthZService<User, Role, Permission, Context<User>> = {
			getRolesFromContext(auth: Context<User>): Promise<Role[]> {
				return [] as any
			}
		},
		authGoodRoles: BasicAuthZService<User, Role, Permission, Context<User>> = {
			getRolesFromContext(auth: Context<User>): Promise<Role[]> {
				return [
					{
						hasPermission: () => true
					}
				] as any
			}
		},
		authBadRoles: BasicAuthZService<User, Role, Permission, Context<User>> = {
			getRolesFromContext(auth: Context<User>): Promise<Role[]> {
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
		expect(new Authorizer(auth)).toBeDefined()
	})

	it('should not authorize if missing context', async () => {
		res = await new Authorizer(auth).authorize(null, [])
		expect(res).toBeFalsy()
	})

	it('should return true if user or system context and no permissions', async () => {
		res = await new Authorizer(auth).authorize(
			new Context(ContextType.SYSTEM),
			[]
		)
		expect(res).toBeTruthy()
		res = await new Authorizer(auth).authorize(
			new Context(ContextType.USER, testUser),
			[]
		)
		expect(res).toBeTruthy()
	})

	it('should return true if system needing permissions', async () => {
		res = await new Authorizer(auth).authorize(
			new Context(ContextType.SYSTEM),
			[{}]
		)
		expect(res).toBeTruthy()
	})

	it('should return false if guest needing permissions', async () => {
		res = await new Authorizer(auth).authorize(
			new Context(ContextType.USER, testUser),
			[{}]
		)
		expect(res).toBeFalsy()
	})

	it('should return false if user needs permissions but has no roles', async () => {
		res = await new Authorizer(auth).authorize(
			new Context(ContextType.USER, testUser),
			[{}]
		)
		expect(res).toBeFalsy()
	})

	it('should return false if user needs permissions but doesnt have them', async () => {
		res = await new Authorizer(authBadRoles).authorize(
			new Context(ContextType.USER, testUser),
			[{}]
		)
		expect(res).toBeFalsy()
	})

	it('should return true  if user has needed permissions', async () => {
		res = await new Authorizer(authGoodRoles).authorize(
			new Context(ContextType.USER, testUser),
			[{}]
		)
		expect(res).toBeTruthy()
	})
})
