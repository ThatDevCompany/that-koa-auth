import { User } from '@/types'
import {CognitoAuthCredential, CognitoAuthenticator} from '@/authenticators/cognito.authenticator'
import {AuthContext} from "@/authcontext";

/**
 * An Authentication Provider for Facebook auth federated through Cognito
 */
export class FacebookAuthenticator<
	U extends User,
	C extends CognitoAuthCredential,
	A extends AuthContext<U>
> extends CognitoAuthenticator<U, C, A> {
	/**
	 * Return the Indentity Request object
	 */
	public makeIdentityRequest(ctx: any) {
		const c = this.auth.cognitoConfig

		return {
			IdentityPoolId: c.identityPoolId,
			Logins: { ['graph.facebook.com']: ctx.request.body.token }
		}
	}
}
