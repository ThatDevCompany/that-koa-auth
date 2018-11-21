import { BasicAuthorizer, BasicAuthZService, BasicAuthZRole } from './basic.authorizer'
import {Context} from "@/context";

/**
 * BasicAuthorizer
 */
describe('BasicAuthorizer', () => {

	let auth: BasicAuthZService<BasicAuthZRole> = {
			getRolesForContext(uctx: Context): Promise<Array<BasicAuthZRole>> {
				return [] as any
			}
		},
		authGoodRoles: BasicAuthZService<BasicAuthZRole> = {
			getRolesForContext(uctx: Context): Promise<Array<BasicAuthZRole>> {
				return [{
					hasPermission: () => true
				}] as any
			}
		},
		authBadRoles: BasicAuthZService<BasicAuthZRole> = {
			getRolesForContext(uctx: Context): Promise<Array<BasicAuthZRole>> {
				return [{
					hasPermission: () => false
				}] as any
			}
		}
	let res

	it('should be instantiable', async () => {
		expect(new BasicAuthorizer(auth)).toBeDefined()
	})

	it('should not authorize if missing context', async () => {
		res = await new BasicAuthorizer(auth).authorize(null, [])
		expect(res).toBeFalsy()
	})

	it('should return true if user or system context and no permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(Context.System(), [])
		expect(res).toBeTruthy()
		res = await new BasicAuthorizer(auth).authorize(Context.User('1234'), [])
		expect(res).toBeTruthy()
	})

	it('should return true if system needing permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(Context.System(), [{}])
		expect(res).toBeTruthy()
	})

	it('should return false if guest needing permissions', async () => {
		res = await new BasicAuthorizer(auth).authorize(Context.Guest(), [{}])
		expect(res).toBeFalsy()
	})

	it('should return false if user needs permissions but has no roles', async () => {
		res = await new BasicAuthorizer(auth).authorize(Context.User('1234'), [{}])
		expect(res).toBeFalsy()
	})

	it('should return false if user needs permissions but doesnt have them', async () => {
		res = await new BasicAuthorizer(authBadRoles).authorize(Context.User('1234'), [{}])
		expect(res).toBeFalsy()
	})

	it('should return true  if user has needed permissions', async () => {
		res = await new BasicAuthorizer(authGoodRoles).authorize(Context.User('1234'), [{}])
		expect(res).toBeTruthy()
	})

})
