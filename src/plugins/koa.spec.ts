import { KoaCredGenerator, koaAuthN } from './koa'
import { AuthContext, AuthContextType } from '@/authcontext'
import { Authenticator } from '@/authenticator'
import { AuthCredential, User } from '@/types'

/**
 * Tests for Context
 */
describe('Context', () => {
	let noAuth: Authenticator<User, AuthCredential, AuthContext<User>> = {
		async userContext(cred: AuthCredential): Promise<AuthContext<User>> {
			return null
		},
		async systemContext(): Promise<AuthContext<User>> {
			return null
		},
		async guestContext(): Promise<AuthContext<User>> {
			return null
		}
	}
	let auth: Authenticator<User, AuthCredential, AuthContext<User>> = {
		async userContext(cred: AuthCredential): Promise<AuthContext<User>> {
			return Promise.resolve(
				new AuthContext(AuthContextType.USER, { id: '1234' })
			)
		},
		async systemContext(): Promise<AuthContext<User>> {
			return Promise.resolve(new AuthContext())
		},
		async guestContext(): Promise<AuthContext<User>> {
			return Promise.resolve(new AuthContext())
		}
	}
	let koaAuthCredentialsGenerator: KoaCredGenerator<AuthCredential> = {
		generateCredentialFromKoaContext(ctx: any): AuthCredential {
			return { identity: '1234' }
		}
	}

	/**
	 * General Tests
	 */
	it('should be a middleware factory', async () => {
		expect(koaAuthN).toBeDefined()
		expect(typeof koaAuthN).toBe('function')
		const test = koaAuthN(koaAuthCredentialsGenerator, noAuth)
		expect(test).toBeDefined()
		expect(typeof test).toBe('function')
	})

	it('should attach a guest context if authentication fails', async () => {
		const test = koaAuthN(koaAuthCredentialsGenerator, noAuth)
		const ctx = { headers: {}, query: {}, auth: null }
		const next = jasmine.createSpy('next')
		await test(ctx, next)
		expect(ctx.auth).toBeDefined()
		expect(ctx.auth.isGuest).toBeTruthy()
		expect(next.calls.count()).toBe(1)
	})

	it('should attach a user context if authentication succeeds', async () => {
		const test = koaAuthN(koaAuthCredentialsGenerator, auth)
		const ctx = { headers: {}, query: {}, auth: null }
		const next = jasmine.createSpy('next')
		await test(ctx, next)
		expect(ctx.auth).toBeDefined()
		expect(ctx.auth.isUser).toBeTruthy()
		expect(next.calls.count()).toBe(1)
	})
})
