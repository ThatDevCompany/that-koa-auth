import { assert } from 'that-koa-error'
import { CognitoIdentity } from 'aws-sdk'

/**
 * An Authentication Provider for Cognito authentication tokens
 */
export interface CognitoConfig {
	region: string
	userPool: string
	identityPoolId: string
}

/**
 * A Cognito Token transformer for UserPool federated logins
 */
export class Cognito {
	/* CONSTRUCTOR */
	constructor(protected config: CognitoConfig) {}

	/**
	 * Validate a Token and return the Federated Id
	 */
	async tokenToFederatedId(token: string): Promise<string> {
		// NULL Safety
		assert(token, 'Missing token')

		// Get the ID from the Identity Pool
		return new Promise<string>((resolve, reject) => {
			new CognitoIdentity({
				region: this.config.region
			}).getId(this.makeIdentityRequest(token), (err, data) => {
				if (err) {
					return reject(err)
				}
				return resolve(data.IdentityId)
			})
		})
	}

	/**
	 * Return the Indentity Request object
	 */
	// istanbul ignore next
	protected makeIdentityRequest(token: string) {
		const c = this.config

		return {
			IdentityPoolId: c.identityPoolId,
			Logins: {
				[`cognito-idp.${c.region}.amazonaws.com/${c.userPool}`]: token
			}
		}
	}
}
