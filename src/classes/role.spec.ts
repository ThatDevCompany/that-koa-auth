import { Role } from './role'

/**
 * Tests for Role
 */
describe('Role', () => {
	it('should be instantiable', async () => {
		const test = new Role()
		expect(test).toBeDefined()
		expect(test.hasPermission(null)).toBe(false)
	})
})
