import { SecurityDAO, ExampleSecurityDAO } from './securitydao'
import {AuthToken, User} from "@/models";

/**
 * Tests for SecurityDAO
 */
describe('SecurityDAO', () => {

	/**
	 * General Tests
	 */
	it('should be an interface', async () => {
		const test: SecurityDAO = {
			findUserById(tenantId: string, id: string): Promise<User> { return null },
			findUserByIdentity(tenantId: string, identity: string): Promise<User> { return null },
			findAuthTokenById(id: string): Promise<AuthToken> { return null }
		}
		expect(test).toBeDefined()
		expect(ExampleSecurityDAO).toBeDefined()
		expect(await ExampleSecurityDAO.findUserById(null, null)).toBeNull()
		expect(await ExampleSecurityDAO.findUserByIdentity(null, null)).toBeNull()
		expect(await ExampleSecurityDAO.findAuthTokenById(null)).toBeNull()
	})
})