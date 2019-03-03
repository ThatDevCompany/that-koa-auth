import { User } from './user'

/**
 * Tests for User
 */
describe('User', () => {
	it('should instantiable', async () => {
		const test = new User()
		expect(test).toBeDefined()
	})
})
