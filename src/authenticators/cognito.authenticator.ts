import { assert } from 'that-koa-error'
import { AuthCredential, User } from '@/types'
import { AuthError } from '@/errors'
import { Authenticator } from '@/authenticator'
import { CognitoIdentity } from 'aws-sdk'
import { AuthContext, AuthContextType } from '@/authcontext'
import { AuthService } from '@/authservice'

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
		protected ContextClass: { new (...args): A },
		protected authNService: CognitoAuthNService<U, C>
	) {}

	/**
	 * Authenticate a KOA request context
	 */
	async userContext(cred: C): Promise<A> {
		// NULL Safety
		assert(cred.identity, 'Missing cognito token')

		// Get the ID from the Identity Pool
		let user: U
		try {
			const cognitoId = await new Promise<string>((resolve, reject) => {
				this._identityPool.getId(
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

			user = await this.authNService.findUserMatchingCredentials({
				...(cred as object),
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
		return new this.ContextClass(AuthContextType.USER, user)
	}

	async systemContext(...args): Promise<A> {
		return new this.ContextClass(AuthContextType.SYSTEM, null, null, ...args)
	}

	async guestContext(...args): Promise<A> {
		return new this.ContextClass(AuthContextType.GUEST, null, null, ...args)
	}

	/**
	 * Return the Indentity Request object
	 */
	// istanbul ignore next
	protected makeIdentityRequest(identity: string) {
		const c = this.authNService.cognitoConfig

		return {
			IdentityPoolId: c.identityPoolId,
			Logins: {
				[`cognito-idp.${c.region}.amazonaws.com/${c.userPool}`]: identity
			}
		}
	}

	/* PRIVATE METHODS */
	/**
	 * Returns a Cognito Identity Pool provider
	 */
	private get _identityPool(): CognitoIdentity {
		return new CognitoIdentity({
			region: this.authNService.cognitoConfig.region
		})
	}
}
