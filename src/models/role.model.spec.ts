import { ExampleRole } from './role.model'

/**
 * Tests for Role
 */
describe('Role', () => {
	/**
	 * General Tests
	 */
	it('should be defined', async () => {
		expect(ExampleRole).toBeDefined()
	})

	it('should validate permissions', async () => {
		expect(ExampleRole.hasPermission(null)).toBeTruthy()
	})
})
