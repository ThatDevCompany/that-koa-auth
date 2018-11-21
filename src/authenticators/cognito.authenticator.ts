import { assert } from 'that-koa-error'
import { User } from '@/types'
import { AuthError } from '@/errors'
import { Authenticator } from '@/authenticator'
import { CognitoIdentity } from 'aws-sdk'

/**
 * An Authentication Provider for Cognito authentication tokens
 */
export interface CognitoAuthNService<U extends User> {
	cognitoConfig: {
		region: string
		userPool: string
		identityPoolId: string
	}
	findUserByCognitoId(tenantId: string, cognitoId: string): Promise<U>
}

export class CognitoAuthenticator<U extends User> implements Authenticator<U> {
	/* CONSTRUCTOR */
	constructor(protected auth: CognitoAuthNService<U>) {}

	/**
	 * Return the Indentity Request object
	 */
	public makeIdentityRequest(ctx: any) {
		const c = this.auth.cognitoConfig

		return {
			IdentityPoolId: c.identityPoolId,
			Logins: {
				[`cognito-idp.${c.region}.amazonaws.com/${c.userPool}`]: ctx.request
					.body.token
			}
		}
	}

	/**
	 * Authenticate a KOA request context
	 */
	async authenticate(ctx: any): Promise<{ user: U }> {
		// NULL Safety
		assert(ctx.request.body.tenantId, 'Missing tenantId')
		assert(ctx.request.body.token, 'Missing token')

		// Get the ID from the Identity Pool
		let cognitoId
		try {
			cognitoId = await new Promise((resolve, reject) => {
				this.identityPool.getId(this.makeIdentityRequest(ctx), (err, data) => {
					if (err) {
						return reject(err)
					}
					return resolve(data.IdentityId)
				})
			})
		} catch (err) {
			throw new AuthError('Problem with Cognito AuthN', { err })
		}

		// Fetch user for the Given Cognito Id
		let tenantId = ctx.request.body.tenantId
		const user = await this.auth.findUserByCognitoId(tenantId, cognitoId)

		// If user not found
		if (!user) {
			throw new AuthError('Problem finding User by Cognito Id', { cognitoId })
		}

		// Return user
		return { user }
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
