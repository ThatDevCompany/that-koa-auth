import { User } from '@/types'
import {
	CognitoAuthCredential,
	CognitoAuthenticator
} from '@/authenticators/cognito.authenticator'
import { AuthContext } from '@/authcontext'

/**
 * An Authentication Provider for Google auth federated through Cognito
 */
export class GoogleAuthenticator<
	U extends User,
	C extends CognitoAuthCredential,
	A extends AuthContext<U>
> extends CognitoAuthenticator<U, C, A> {
	/**
	 * Return the Indentity Request object
	 */
	protected makeIdentityRequest(ctx: any) {
		const c = this.authNService.cognitoConfig

		return {
			IdentityPoolId: c.identityPoolId,
			Logins: { ['accounts.google.com']: ctx.request.body.token }
		}
	}
}
