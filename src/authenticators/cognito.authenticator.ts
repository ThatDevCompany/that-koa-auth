import {assert} from 'that-koa-error'
import {AuthCredential, User} from '@/types'
import {AuthError} from '@/errors'
import {Authenticator} from '@/authenticator'
import {CognitoIdentity} from 'aws-sdk'
import {AuthContext, AuthContextType} from '@/authcontext'
import {AuthService} from "@/authservice";

/**
 * An Authentication Provider for Cognito authentication tokens
 */

export interface CognitoAuthCredential extends AuthCredential {
	cognitoId?: string
}

export interface CognitoAuthNService<
	U extends User,
	C extends CognitoAuthCredential
> extends AuthService {

	cognitoConfig: {
		region: string
		userPool: string
		identityPoolId: string
	}

	findUserMatchingCredentials(cred: C): Promise<U>
}


export class CognitoAuthenticator<
	U extends User,
	C extends CognitoAuthCredential,
	A extends AuthContext<U>
> implements Authenticator<U, C, A> {
	/* CONSTRUCTOR */
	constructor(
		protected auth: CognitoAuthNService<U, C>
	) {}

	/**
	 * Return the Indentity Request object
	 */
	public makeIdentityRequest(identity: string) {
		const c = this.auth.cognitoConfig

		return {
			IdentityPoolId: c.identityPoolId,
			Logins: {
				[`cognito-idp.${c.region}.amazonaws.com/${c.userPool}`]: identity
			}
		}
	}

	/**
	 * Authenticate a KOA request context
	 */
	async generateAuthContext(cred: C): Promise<A> {
		// NULL Safety
		assert(cred.identity, 'Missing cognito token')

		// Get the ID from the Identity Pool
		let user: U
		try {
			const cognitoId = await new Promise<string>((resolve, reject) => {
				this.identityPool.getId(
					this.makeIdentityRequest(cred.identity),
					(err, data) => {
						if (err) {
							return reject(err)
						}
						return resolve(data.IdentityId)
					}
				)
			})

			// Fetch user for the Given Cognito Id

			user = await this.auth.findUserMatchingCredentials({
				...cred as object,
				cognitoId: cognitoId
			} as C)
		} catch (err) {
			throw new AuthError('Problem with Cognito AuthN', err)
		}

		// If user not found
		if (!user) {
			throw new AuthError('Problem finding User', cred)
		}

		// Return user
		return (new AuthContext<U>(AuthContextType.USER, user)) as A
	}

	async generateGuestContext(): Promise<A> {
		return (new AuthContext<User>()) as A
	}

	/* PRIVATE METHODS */
	/**
	 * Returns a Cognito Identity Pool provider
	 */
	private get identityPool(): CognitoIdentity {
		return new CognitoIdentity({
			region: this.auth.cognitoConfig.region
		})
	}
}
