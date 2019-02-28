import {
	CognitoAuthCredential,
	CognitoAuthenticator
} from './cognito.authenticator'
import { CognitoAuthNService } from '@/authenticators/cognito.authenticator'
import { User } from '@/types'
import { expectAsyncToThrow } from 'that-koa-error'
import { CognitoIdentity } from 'aws-sdk'
import { AuthContext } from '@/authcontext'

/**
 * CognitoAuthenticator
 */
describe('CognitoAuthenticator', () => {
	let auth: CognitoAuthNService<User, CognitoAuthCredential> = {
		cognitoConfig: {
			region: '',
			userPool: '',
			identityPoolId: ''
		},
		findUserMatchingCredentials: jasmine
			.createSpy()
			.and.returnValue(Promise.resolve({}))
	}

	it('should be instantiable', async () => {
		expect(new CognitoAuthenticator(AuthContext, auth)).toBeDefined()
	})
})

/**
 * CognitoAuthenticator
 */
describe('CognitoAuthenticator.authenticate', () => {
	let auth: CognitoAuthNService<User, CognitoAuthCredential> = {
			cognitoConfig: {
				region: '',
				userPool: '',
				identityPoolId: ''
			},
			findUserMatchingCredentials: jasmine
				.createSpy()
				.and.returnValue(Promise.resolve({}))
		},
		authNoUsers: CognitoAuthNService<User, CognitoAuthCredential> = {
			cognitoConfig: {
				region: '',
				userPool: '',
				identityPoolId: ''
			},
			findUserMatchingCredentials: jasmine
				.createSpy()
				.and.returnValue(Promise.resolve(null))
		}
	let testTenant = { id: '1234' }

	it('should handle nulls', async () => {
		await expectAsyncToThrow(() =>
			new CognitoAuthenticator(AuthContext, auth).userContext(null)
		)
		await expectAsyncToThrow(() =>
			new CognitoAuthenticator(AuthContext, auth).userContext({})
		)
		await expectAsyncToThrow(() =>
			new CognitoAuthenticator(AuthContext, auth).userContext({
				identity: '1234'
			})
		)
	})

	it('should handle cognito errors', async () => {
		CognitoIdentity.prototype.getId = jasmine
			.createSpy('getId')
			.and.callFake((id, cb) => {
				cb('Error', null)
			})
		await expectAsyncToThrow(() =>
			new CognitoAuthenticator(AuthContext, auth).userContext({
				identity: 'abcd'
			})
		)
	})

	it('should handle case when user not found', async () => {
		CognitoIdentity.prototype.getId = jasmine
			.createSpy('getId')
			.and.callFake((id, cb) => {
				cb(null, { IdentityId: '1234' })
			})
		await expectAsyncToThrow(() =>
			new CognitoAuthenticator(AuthContext, authNoUsers).userContext({
				identity: 'abcd'
			})
		)
	})

	it('should return users', async () => {
		CognitoIdentity.prototype.getId = jasmine
			.createSpy('getId')
			.and.callFake((id, cb) => {
				cb(null, { IdentityId: '1234' })
			})
		const res = await new CognitoAuthenticator(AuthContext, auth).userContext({
			identity: 'abcd'
		})
		expect(res).toBeDefined()
	})

	it('should get guest contexts', async () => {
		const res = await new CognitoAuthenticator(AuthContext, auth).guestContext()
		expect(res).toBeDefined()
	})

	it('should get system contexts', async () => {
		const res = await new CognitoAuthenticator(AuthContext, auth).systemContext()
		expect(res).toBeDefined()
	})
})
