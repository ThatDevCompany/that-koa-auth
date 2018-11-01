import { Credentials, ExampleCredentials } from './credentials'

/**
 * Credentials
 */
describe('Credentials', () => {
	it('should be a type interface', async () => {
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
