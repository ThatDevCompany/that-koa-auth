import { Cognito } from './cognito'

/**
 * A Cognito Token transformer for Facebook federated logins
 */
export class Facebook extends Cognito {
	/**
	 * Return the Indentity Request object
	 */
	protected makeIdentityRequest(token: string) {
		return {
			IdentityPoolId: this.config.identityPoolId,
			Logins: { ['graph.facebook.com']: token }
		}
	}
}
