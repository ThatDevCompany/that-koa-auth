import { BasicAuthenticator, BasicAuthNService } from './basic.authenticator'
import { AuthCredential, User } from '@/types'
import { AuthContext } from '@/authcontext'
import { expectAsyncToThrow } from 'that-koa-error'

/**
 * TokenAuthenticator
 */
describe('TokenAuthenticator', () => {
	let auth: BasicAuthNService<User, AuthCredential> = {
		findUserMatchingCredentials: jasmine
			.createSpy()
			.and.returnValue(Promise.resolve({ id: '1234' }))
	}
	let authFail: BasicAuthNService<User, AuthCredential> = {
		findUserMatchingCredentials: jasmine
			.createSpy()
			.and.returnValue(Promise.resolve(null))
	}

	it('should be instantiable', async () => {
		expect(new BasicAuthenticator(AuthContext, auth)).toBeDefined()
	})

	it('should handle context nulls', async () => {
		await expectAsyncToThrow(() =>
			new BasicAuthenticator(AuthContext, auth).userContext(null)
		)
		await expectAsyncToThrow(() =>
			new BasicAuthenticator(AuthContext, auth).userContext({
				identity: '1234'
			})
		)
		await expectAsyncToThrow(() =>
			new BasicAuthenticator(AuthContext, authFail).userContext({
				identity: '1234'
			})
		)
	})

	it('should error if user not found', async () => {
		await expectAsyncToThrow(() =>
			new BasicAuthenticator(AuthContext, authFail).userContext({
				identity: '1234'
			})
		)
	})

	it('should return user if found', async () => {
		const user = new BasicAuthenticator(AuthContext, auth).userContext({
			identity: '1234'
		})
		expect(user).toBeDefined()
	})

	it('should get guest contexts', async () => {
		const res = await new BasicAuthenticator(AuthContext, auth).guestContext()
		expect(res).toBeDefined()
	})

	it('should get system contexts', async () => {
		const res = await new BasicAuthenticator(AuthContext, auth).systemContext()
		expect(res).toBeDefined()
	})
})
