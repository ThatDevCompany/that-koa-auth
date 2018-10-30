import {Credentials, ExampleCredentials} from './credentials'
import {AuthProviderType} from "@/authnproviders";

/**
 * Tests for Credentials
 */
describe('Credentials', () => {

	/**
	 * General Tests
	 */
	it('should be an interface', async () => {
		const test: Credentials = {
			provider: AuthProviderType.BASIC,
			tenantId: '123',
			identity: '123',
			passkey: '123'
		}
		expect(test).toBeDefined()
		expect(ExampleCredentials).toBeDefined()
	})
})