import { BasicAuthenticator, BasicAuthNService } from './basic.authenticator'
import { AuthCredential, User} from '@/types'
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
		findUserMatchingCredentials: jasmine.createSpy().and.returnValue(Promise.resolve(null))
	}

	it('should be instantiable', async () => {
		expect(new BasicAuthenticator(auth)).toBeDefined()
	})

	it('should handle context nulls', async () => {
		await expectAsyncToThrow(() =>
			new BasicAuthenticator(auth).generateAuthContext(null)
		)
		await expectAsyncToThrow(() =>
			new BasicAuthenticator(auth).generateAuthContext({ identity: '1234' })
		)
		await expectAsyncToThrow(() =>
			new BasicAuthenticator(authFail).generateAuthContext({ identity: '1234' })
		)
	})

	it('should error if user not found', async () => {
		await expectAsyncToThrow(() =>
			new BasicAuthenticator(authFail).generateAuthContext({ identity: '1234' })
		)
	})

	it('should return user if found', async () => {
		const user = new BasicAuthenticator(auth).generateAuthContext({ identity: '1234' })
		expect(user).toBeDefined()
	})
})
