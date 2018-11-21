import { Authenticator, ExampleAuthenticator } from './authenticator'
import { User } from '@/types'

/**
 * Authenticator
 */
describe('Authenticator', () => {
	it('should be a type interface', async () => {
		const test: Authenticator<User> = {
			async authenticate(ctx: any): Promise<{ user: User; data?: any }> {
				return null
			}
		}
		expect(test).toBeDefined()
		expect(ExampleAuthenticator).toBeDefined()
		expect(ExampleAuthenticator.authenticate(null)).toBeDefined()
	})
})
