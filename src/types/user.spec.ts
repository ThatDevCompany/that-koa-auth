import { User, ExampleUser } from './user'

/**
 * Tests for User
 */
describe('User', () => {
	it('should be a type interface', async () => {
		const test: User = {
			id: '123',
			tenantId: '123'
		}
		expect(test).toBeDefined()
		expect(ExampleUser).toBeDefined()
	})
})
