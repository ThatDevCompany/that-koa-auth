import { assert } from 'that-koa-error'
import { Credentials, User, Tenant } from '@/types'
import { AuthError } from '@/errors'
import { Authenticator } from '@/authenticator'
import { CognitoIdentity } from 'aws-sdk'
import {AuthContext} from "@/authcontext";

/**
 * An Authentication Provider for Cognito authentication tokens
 */
export interface CognitoAuthNService<U extends User, T extends Tenant> {
	cognitoConfig: {
		region: string
		userPool: string
		identityPoolId: string
	}
	findUserByCognitoId(cognitoId: string, tenant?: Tenant): Promise<U>
}

export class CognitoAuthenticator<U extends User, T extends Tenant> implements Authenticator<U, T> {
	/* CONSTRUCTOR */
	constructor(protected auth: CognitoAuthNService<U, T>) {}

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
	async generateAuthContext(credentials: Credentials<T>): Promise<AuthContext<U, T>> {
		// NULL Safety
		assert(credentials.identity, 'Missing token')

		// Get the ID from the Identity Pool
		let user: U
		try {
			const cognitoId = await new Promise<string>((resolve, reject) => {
				this.identityPool.getId(this.makeIdentityRequest(credentials.identity), (err, data) => {
					if (err) {
						return reject(err)
					}
					return resolve(data.IdentityId)
				})
			})

			// Fetch user for the Given Cognito Id
			user = await this.auth.findUserByCognitoId(cognitoId)

		} catch (err) {
			throw new AuthError('Problem with Cognito AuthN', err)
		}

		// If user not found
		if (!user) {
			throw new AuthError('Problem finding User', credentials)
		}

		// Return user
		return AuthContext.User<U, T>( user, credentials.tenant, {} )

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
