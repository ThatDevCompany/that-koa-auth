import { SecurityDAO, ExampleSecurityDAO } from './securitydao'
import { User } from '@/models'
import {Context} from "@/context";

/**
 * Tests for SecurityDAO
 */
describe('SecurityDAO', () => {
	/**
	 * General Tests
	 */
	it('should be an interface', async () => {
		const test: SecurityDAO<User> = {
			async findUserById(tenantId: string, id: string): Promise<User> {
				return null
			},
			async findUserByIdentity(tenantId: string, identity: string): Promise<User> {
				return null
			},
			async contextFromToken(token: string): Promise<Context> {
				return Context.Guest()
			}
		}
		expect(test).toBeDefined()
		expect(ExampleSecurityDAO).toBeDefined()
		expect(await ExampleSecurityDAO.findUserById(null, null)).toBeNull()
		expect(await ExampleSecurityDAO.findUserByIdentity(null, null)).toBeNull()
		expect(await ExampleSecurityDAO.contextFromToken(null)).toBeDefined()
	})
})
