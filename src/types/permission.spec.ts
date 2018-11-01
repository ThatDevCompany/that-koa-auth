import { Permission, ExamplePermission } from './permission'

/**
 * Permission
 */
describe('Permission', () => {
	it('should be a type interface', async () => {
		const test: Permission = {}
		expect(test).toBeDefined()
		expect(ExamplePermission).toBeDefined()
	})
})
