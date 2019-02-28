import { GoogleAuthenticator } from './google.authenticator'
import {
	CognitoAuthCredential,
	CognitoAuthNService
} from '@/authenticators/cognito.authenticator'
import { User } from '@/types'
import { AuthContext } from '@/authcontext'

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
		expect(new GoogleAuthenticator(AuthContext, auth)).toBeDefined()
	})
})
