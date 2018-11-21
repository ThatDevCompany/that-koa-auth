import {
	PasswordAuthenticator,
	PasswordAuthNService,
	PasswordAuthNUser
} from './password.authenticator'
import { expectAsyncToThrow } from 'that-koa-error'

/**
 * PasswordAuthenticator
 */
describe('PasswordAuthenticator', () => {
	let auth: PasswordAuthNService<PasswordAuthNUser> = {
		findUserByIdentity: jasmine.createSpy().and.returnValue(
			Promise.resolve({
				async passwordMatches(v) {
					return v === 'test'
				}
			})
		)
	}
	let authFail: PasswordAuthNService<PasswordAuthNUser> = {
		findUserByIdentity: jasmine
			.createSpy()
			.and.returnValue(Promise.resolve(null))
	}

	it('should be instantiable', async () => {
		expect(new PasswordAuthenticator(auth)).toBeDefined()
	})

	it('should error if user not found', async () => {
		await expectAsyncToThrow(() =>
			new PasswordAuthenticator(authFail).authenticate({
				request: { body: {} }
			})
		)
	})

	it('should error if user password failure', async () => {
		await expectAsyncToThrow(() =>
			new PasswordAuthenticator(auth).authenticate({
				request: { body: { passkey: 'cheese' } }
			})
		)
	})

	it('should return user if password match', async () => {
		const user = await new PasswordAuthenticator(auth).authenticate({
			request: { body: { passkey: 'test' } }
		})
		expect(user).toBeDefined()
	})
})
