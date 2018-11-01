import { GoogleAuthenticator } from './google.authenticator'

/**
 * GoogleAuthenticator
 */
describe('GoogleAuthenticator', () => {
	it('should be instantiable', async () => {
		expect(new GoogleAuthenticator()).toBeDefined()
	})

	it('should throw an AuthError during authentication', async () => {
		try {
			expect(new GoogleAuthenticator().authenticate(null)).toThrowError()
			expect(false).toBeTruthy()
		} catch (e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
