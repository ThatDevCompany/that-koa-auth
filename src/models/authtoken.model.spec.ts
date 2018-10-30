import { ExampleAuthToken } from './authtoken.model'

/**
 * Tests for AuthToken
 */
describe('AuthToken', () => {
	/**
	 * General Tests
	 */
	it('should be defined', async () => {
		expect(ExampleAuthToken).toBeDefined()
	})

	it('should be validatable', async () => {
		expect(ExampleAuthToken.isValid()).toBeTruthy()
	})
})
