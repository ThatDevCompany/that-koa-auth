import { Facebook } from './facebook'

/**
 * FacebookAuthenticator
 */
describe('Facebook', () => {
	let cognitoConfig: {
		region: ''
		userPool: ''
		identityPoolId: ''
	}

	it('should be instantiable', async () => {
		expect(new Facebook(cognitoConfig)).toBeDefined()
	})
})
