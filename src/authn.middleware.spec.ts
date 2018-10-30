import { authn } from './authn.middleware'
import { ExampleSecurityDAO } from './securitydao'

/**
 * Tests for Context
 */
describe('Context', () => {

	/**
	 * General Tests
	 */
	it('should be a middleware factory', async () => {
		expect(authn).toBeDefined()
		expect(typeof authn).toBe('function')
		const test = authn(ExampleSecurityDAO)
		expect(test).toBeDefined()
		expect(typeof test).toBe('function')
	})

})