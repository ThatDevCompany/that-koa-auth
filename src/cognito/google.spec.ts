import { Google } from './google'

/**
 * Google
 */
describe('Google', () => {
	let cognitoConfig: {
		region: ''
		userPool: ''
		identityPoolId: ''
	}

	it('should be instantiable', async () => {
		expect(new Google(cognitoConfig)).toBeDefined()
	})
})
