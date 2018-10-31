import { Credentials, ExampleCredentials } from './credentials'

/**
 * Tests for Credentials
 */
describe('Credentials', () => {
	/**
	 * General Tests
	 */
	it('should be an interface', async () => {
		const test: Credentials = {
			provider: 'provider',
			tenantId: 'tenantId',
			identity: 'identity',
			passkey: 'passkey'
		}
		expect(test).toBeDefined()
		expect(ExampleCredentials).toBeDefined()
	})
})
