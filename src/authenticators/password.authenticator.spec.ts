import {
	PasswordAuthCredential,
	PasswordAuthenticator,
	PasswordAuthNUser
} from './password.authenticator'
import { AuthContext } from '@/authcontext'
import { expectAsyncToThrow } from 'that-koa-error'
import { BasicAuthNService } from '@/authenticators/basic.authenticator'

/**
 * PasswordAuthenticator
 */
describe('PasswordAuthenticator', () => {
	let auth: BasicAuthNService<PasswordAuthNUser, PasswordAuthCredential> = {
		findUserMatchingCredentials: jasmine.createSpy().and.returnValue(
			Promise.resolve({
				async passwordMatches(v) {
					return v === 'test'
				}
			})
		)
	}
	let authFail: BasicAuthNService<PasswordAuthNUser, PasswordAuthCredential> = {
		findUserMatchingCredentials: jasmine
			.createSpy()
			.and.returnValue(Promise.resolve(null))
	}

	it('should be instantiable', async () => {
		expect(new PasswordAuthenticator(AuthContext, auth)).toBeDefined()
	})

	it('should error if user not found', async () => {
		await expectAsyncToThrow(() =>
			new PasswordAuthenticator(AuthContext, authFail).userContext({
				identity: '1234',
				passkey: 'abcd'
			})
		)
	})

	it('should error if user password failure', async () => {
		await expectAsyncToThrow(() =>
			new PasswordAuthenticator(AuthContext, auth).userContext({
				identity: '1234',
				passkey: 'abcd'
			})
		)
	})

	it('should return user if password match', async () => {
		const user = await new PasswordAuthenticator(AuthContext, auth).userContext(
			{
				identity: '1234',
				passkey: 'test'
			}
		)
		expect(user).toBeDefined()
	})
})
