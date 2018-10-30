import { AuthError } from './auth.error'

/**
 * Tests for AuthError
 */
describe('AuthError', () => {
	/**
	 * General Tests
	 */
	it('should be defined', async () => {
		expect(AuthError).toBeDefined()
	})

	it('should have a 401 status', async () => {
		expect(new AuthError().status).toBe(401)
	})

	it('should have a message', async () => {
		expect(new AuthError().message).toBe('Authentication Failed')
	})

	it('should have a default debug message', async () => {
		expect(new AuthError().debugMessage).toBe('No debug information provided')
	})
})
