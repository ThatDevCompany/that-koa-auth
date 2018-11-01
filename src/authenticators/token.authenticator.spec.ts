import { PasswordAuthenticator } from './password.authenticator'

/**
 * PasswordAuthenticator
 */
describe('PasswordAuthenticator', () => {
	it('should be instantiable', async () => {
		expect(new PasswordAuthenticator(null)).toBeDefined()
	})
})
