import { Authorizer, ExampleAuthorizer } from './authorizer'
import { Context } from '@/context'
import { Permission } from '@/types'

/**
 * Authorizer
 */
describe('Authorizer', () => {
	it('should be a type interface', async () => {
		expect(ExampleAuthorizer).toBeDefined()
		expect(ExampleAuthorizer.authorize(null, null)).toBeDefined()
	})
})
