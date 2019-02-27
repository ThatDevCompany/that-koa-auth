import { GoogleAuthenticator } from './google.authenticator'
import {CognitoAuthCredential, CognitoAuthNService} from '@/authenticators/cognito.authenticator'
import { User } from '@/types'

/**
 * GoogleAuthenticator
 */
describe('GoogleAuthenticator', () => {
	let auth: CognitoAuthNService<User, CognitoAuthCredential> = {
		cognitoConfig: {
			region: '',
			userPool: '',
			identityPoolId: ''
		},
		findUserMatchingCredentials(cred: CognitoAuthCredential): Promise<User> {
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
