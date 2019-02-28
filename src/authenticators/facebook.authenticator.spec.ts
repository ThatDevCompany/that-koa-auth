import { FacebookAuthenticator } from './facebook.authenticator'
import { AuthService } from '@/authservice'
import { User } from '@/types'
import {
	CognitoAuthCredential,
	CognitoAuthNService
} from '@/authenticators/cognito.authenticator'
import { AuthContext } from '@/authcontext'

/**
 * FacebookAuthenticator
 */
describe('FacebookAuthenticator', () => {
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
		expect(new FacebookAuthenticator(AuthContext, auth)).toBeDefined()
	})
})
