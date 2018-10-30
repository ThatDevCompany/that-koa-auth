import { AuthNProvider } from './authnprovider'

/**
 * Tests for AuthNProvider
 */
describe('AuthNProvider', () => {
	/**
	 * General Tests
	 */
	it('should be extendable', async () => {
		const fakeSecurityDAO: any = {}
		class Test extends AuthNProvider {}
		const test = new Test(fakeSecurityDAO)
		expect(test).toBeDefined()
		expect(test.SecurityDAO).toBe(fakeSecurityDAO)
	})
})
