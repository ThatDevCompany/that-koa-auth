import { FacebookAuthenticator } from './facebook.authenticator'
import { AuthService } from '@/authservice'
import { User } from '@/types'
import { CognitoAuthNService } from '@/authenticators/cognito.authenticator'

/**
 * FacebookAuthenticator
 */
describe('FacebookAuthenticator', () => {
	let auth: CognitoAuthNService<User> = {
		cognitoConfig: {
			region: '',
			userPool: '',
			identityPoolId: ''
		},
		findUserByCognitoId(cognitoId: string): Promise<User> {
			return Promise.resolve(null)
		}
	}

	it('should be instantiable', async () => {
		expect(new FacebookAuthenticator(auth)).toBeDefined()
	})

	it('should make a valid IdentityRequest', async () => {
		const req = new FacebookAuthenticator(auth).makeIdentityRequest({
			request: { body: { token: 'abcd' } }
		})
		expect(req).toBeDefined()
	})
})
