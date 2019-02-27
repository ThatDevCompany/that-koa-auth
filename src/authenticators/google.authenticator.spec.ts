import { GoogleAuthenticator } from './google.authenticator'
import { CognitoAuthNService } from '@/authenticators/cognito.authenticator'
import { User } from '@/types'

/**
 * GoogleAuthenticator
 */
describe('GoogleAuthenticator', () => {
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
		expect(new GoogleAuthenticator(auth)).toBeDefined()
	})

	it('should make a valid IdentityRequest', async () => {
		const req = new GoogleAuthenticator(auth).makeIdentityRequest({
			request: { body: { token: 'abcd' } }
		})
		expect(req).toBeDefined()
	})
})
