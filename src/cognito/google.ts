import { Cognito } from './cognito'

/**
 * A Cognito Token transformer for Google federated logins
 */
export class Google extends Cognito {
	/**
	 * Return the Indentity Request object
	 */
	// istanbul ignore next
	protected makeIdentityRequest(token: string) {
		return {
			IdentityPoolId: this.config.identityPoolId,
			Logins: { ['accounts.google.com']: token }
		}
	}
}
