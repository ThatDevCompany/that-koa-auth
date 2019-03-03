import { Cognito } from './cognito'

/**
 * Cognito
 */
describe('Cognito', () => {
	let cognitoConfig: {
		region: ''
		userPool: ''
		identityPoolId: ''
	}

	it('should be instantiable', async () => {
		expect(new Cognito(cognitoConfig)).toBeDefined()
	})
})
