import { Credentials, ExampleCredentials } from './credentials'

/**
 * Credentials
 */
describe('Credentials', () => {
	it('should be a type interface', async () => {
		const test: Credentials = {
			provider: 'provider',
			identity: 'identity',
			passkey: 'passkey'
		}
		expect(test).toBeDefined()
		expect(ExampleCredentials).toBeDefined()
	})
})
