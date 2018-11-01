import { AuthService, ExampleAuthService } from './authservice'

/**
 * AuthService
 */
describe('AuthService', () => {
	it('should be a type interface', async () => {
		const test: AuthService = {}
		expect(test).toBeDefined()
		expect(ExampleAuthService).toBeDefined()
	})
})
