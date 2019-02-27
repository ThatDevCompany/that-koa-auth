import { AuthCredential, ExampleAuthCredential } from './authcredential'

/**
 * AuthCredential
 */
describe('AuthCredential', () => {
	it('should be a type interface', async () => {
		const test: AuthCredential = {
			identity: 'identity'
		}
		expect(test).toBeDefined()
		expect(ExampleAuthCredential).toBeDefined()
	})
})
