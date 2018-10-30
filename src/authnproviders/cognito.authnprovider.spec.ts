import { CognitoAuthNProvider } from './cognito.authnprovider'
import { FacebookAuthNProvider } from '@/authnproviders/facebook.authnprovider'
import { AuthError } from '@/errors'

/**
 * Tests for CognitoAuthNProvider
 */
describe('CognitoAuthNProvider', () => {
	/**
	 * General Tests
	 */
	it('should be instantiable', async () => {
		expect(new CognitoAuthNProvider(null)).toBeDefined()
	})

	it('should throw an AuthError during authentication', async () => {
		try {
			new CognitoAuthNProvider(null).authenticate(null)
			expect(false).toBeTruthy()
		} catch (e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
