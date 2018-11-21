import { TokenAuthenticator, TokenAuthNService } from './token.authenticator'
import { User } from '@/types'
import { expectAsyncToThrow } from 'that-koa-error'

/**
 * TokenAuthenticator
 */
describe('TokenAuthenticator', () => {
	let auth: TokenAuthNService<User> = {
		findUserByToken: jasmine
			.createSpy()
			.and.returnValue(Promise.resolve({ id: '1234' }))
	}
	let authFail: TokenAuthNService<User> = {
		findUserByToken: jasmine.createSpy().and.returnValue(Promise.resolve(null))
	}

	it('should be instantiable', async () => {
		expect(new TokenAuthenticator(auth)).toBeDefined()
	})

	it('should handle context nulls', async () => {
		await expectAsyncToThrow(() =>
			new TokenAuthenticator(auth).authenticate(null)
		)
		await expectAsyncToThrow(() =>
			new TokenAuthenticator(auth).authenticate({ headers: {} })
		)
		await expectAsyncToThrow(() =>
			new TokenAuthenticator(authFail).authenticate({ headers: {}, query: {} })
		)
	})

	it('should error if user not found', async () => {
		await expectAsyncToThrow(() =>
			new TokenAuthenticator(authFail).authenticate({
				headers: {},
				query: { token: '1234' }
			})
		)
	})

	it('should return user if found', async () => {
		const user = new TokenAuthenticator(auth).authenticate({
			headers: {},
			query: { token: '1234' }
		})
		expect(user).toBeDefined()
	})
})
