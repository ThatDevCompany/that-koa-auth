import { User } from '@/types'
import { CognitoAuthenticator } from '@/authenticators/cognito.authenticator'

/**
 * An Authentication Provider for Google auth federated through Cognito
 */
export class GoogleAuthenticator<U extends User> extends CognitoAuthenticator<
	U
> {
	/**
	 * Return the Indentity Request object
	 */
	public makeIdentityRequest(ctx: any) {
		const c = this.auth.cognitoConfig

		return {
			IdentityPoolId: c.identityPoolId,
			Logins: { ['accounts.google.com']: ctx.request.body.token }
		}
	}
}
