import { FacebookAuthenticator } from './facebook.authenticator'

/**
 * FacebookAuthenticator
 */
describe('FacebookAuthenticator', () => {
	it('should be instantiable', async () => {
		expect(new FacebookAuthenticator()).toBeDefined()
	})

	it('should throw an AuthError during authentication', async () => {
		try {
			expect(new FacebookAuthenticator().authenticate(null)).toThrowError()
			expect(false).toBeTruthy()
		} catch (e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
