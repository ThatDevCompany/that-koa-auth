import { Authorizer, ExampleAuthorizer } from './authorizer'
import { Context } from '@/context'
import { Permission } from '@/types'

/**
 * Authorizer
 */
describe('Authorizer', () => {
	it('should be a type interface', async () => {
		const test: Authorizer = {
			async authorize(
				uctx: Context,
				permissions: Array<Permission>
			): Promise<boolean> {
				return true
			}
		}
		expect(test).toBeDefined()
		expect(ExampleAuthorizer).toBeDefined()
	})
})
