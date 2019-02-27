import {CognitoAuthCredential, CognitoAuthenticator} from './cognito.authenticator'
import { CognitoAuthNService } from '@/authenticators/cognito.authenticator'
import { User } from '@/types'
import { expectAsyncToThrow } from 'that-koa-error'
import { CognitoIdentity } from 'aws-sdk'

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
		expect(new CognitoAuthenticator(auth)).toBeDefined()
	})

	it('should make a valid IdentityRequest', async () => {
		const req = new CognitoAuthenticator(auth).makeIdentityRequest('abcd')
		expect(req).toBeDefined()
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
			new CognitoAuthenticator(auth).generateAuthContext(null)
		)
		await expectAsyncToThrow(() =>
			new CognitoAuthenticator(auth).generateAuthContext({})
		)
		await expectAsyncToThrow(() =>
			new CognitoAuthenticator(auth).generateAuthContext({
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
			new CognitoAuthenticator(auth).generateAuthContext({
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
			new CognitoAuthenticator(authNoUsers).generateAuthContext({
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
		const res = await new CognitoAuthenticator(auth).generateAuthContext({
			identity: 'abcd'
		})
		expect(res).toBeDefined()
	})
})
