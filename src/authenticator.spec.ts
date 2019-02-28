import { Authenticator, ExampleAuthenticator } from './authenticator'
import { AuthCredential, User } from '@/types'
import { AuthContext } from '@/authcontext'

/**
 * Authenticator
 */
describe('Authenticator', () => {
	const cred = {
		identity: '1234'
	}

	it('should be a type interface', async () => {
		const test: Authenticator<User, AuthCredential, AuthContext<User>> = {
			async userContext(cred: AuthCredential): Promise<AuthContext<User>> {
				return null
			},
			async systemContext(): Promise<AuthContext<User>> {
				return null
			},
			async guestContext(): Promise<AuthContext<User>> {
				return null
			}
		}
		expect(test).toBeDefined()
		expect(ExampleAuthenticator).toBeDefined()
		expect(ExampleAuthenticator.userContext(null)).toBeDefined()
	})
})
