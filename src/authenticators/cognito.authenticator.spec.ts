import { CognitoAuthenticator } from './cognito.authenticator'

/**
 * CognitoAuthenticator
 */
describe('CognitoAuthenticator', () => {
	it('should be instantiable', async () => {
		expect(new CognitoAuthenticator()).toBeDefined()
	})

	it('should throw an AuthError during authentication', async () => {
		try {
			new CognitoAuthenticator().authenticate(null)
			expect(false).toBeTruthy()
		} catch (e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
