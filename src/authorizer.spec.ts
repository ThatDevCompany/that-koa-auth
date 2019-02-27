import { Authorizer, ExampleAuthorizer } from './authorizer'

/**
 * Authorizer
 */
describe('Authorizer', () => {
	it('should be a type interface', async () => {
		expect(ExampleAuthorizer).toBeDefined()
		expect(ExampleAuthorizer.authorize(null, null)).toBeDefined()
	})
})
