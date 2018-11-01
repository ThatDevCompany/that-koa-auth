import { Role, ExampleRole } from './role'

/**
 * Tests for Role
 */
describe('Role', () => {
	it('should be a type interface', async () => {
		const test: Role = {}
		expect(test).toBeDefined()
		expect(ExampleRole).toBeDefined()
	})
})
