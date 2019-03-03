import { BasicKoaCredGenerator, KoaCredGenerator, koaAuthN } from './koa'
import { Context, ContextType } from '@/authcontext'
import { Authenticator } from '@/authenticator'
import { AuthCredential, User } from '@/types'

/**
 * Tests for Koa
 */
describe('Koa', () => {
	let noAuth: Authenticator<User, AuthCredential, Context<User>> = {
		async userContext(cred: AuthCredential): Promise<Context<User>> {
			return null
		},
		async systemContext(): Promise<Context<User>> {
			return Promise.resolve(new Context(ContextType.SYSTEM))
		},
		async guestContext(): Promise<Context<User>> {
			return Promise.resolve(new Context())
		}
	}
	let errorAuth: Authenticator<User, AuthCredential, Context<User>> = {
		async userContext(cred: AuthCredential): Promise<Context<User>> {
			throw new Error('sdfsdf')
		},
		async systemContext(): Promise<Context<User>> {
			return Promise.resolve(new Context(ContextType.SYSTEM))
		},
		async guestContext(): Promise<Context<User>> {
			return Promise.resolve(new Context())
		}
	}
	let auth: Authenticator<User, AuthCredential, Context<User>> = {
		async userContext(cred: AuthCredential): Promise<Context<User>> {
			return Promise.resolve(new Context(ContextType.USER, { id: '1234' }))
		},
		async systemContext(): Promise<Context<User>> {
			return Promise.resolve(new Context(ContextType.SYSTEM))
		},
		async guestContext(): Promise<Context<User>> {
			return Promise.resolve(new Context())
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
		expect(ctx.visa).not.toBeNull()
		expect(ctx.visa.isGuest).toBeTruthy()
		expect(next.calls.count()).toBe(1)
	})

	it('should attach a guest context if authentication errors', async () => {
		const test = koaAuthN(koaAuthCredentialsGenerator, errorAuth)
		const ctx = { headers: {}, query: {}, auth: null }
		const next = jasmine.createSpy('next')
		await test(ctx, next)
		expect(ctx.visa).not.toBeNull()
		expect(ctx.visa.isGuest).toBeTruthy()
		expect(next.calls.count()).toBe(1)
	})

	it('should attach a user context if authentication succeeds', async () => {
		const test = koaAuthN(koaAuthCredentialsGenerator, auth)
		const ctx = { headers: {}, query: {}, auth: null }
		const next = jasmine.createSpy('next')
		await test(ctx, next)
		expect(ctx.visa).toBeDefined()
		expect(ctx.visa.isUser).toBeTruthy()
		expect(next.calls.count()).toBe(1)
	})
})

/**
 * BasicKoaCredGenerator
 */
describe('BasicKoaCredGenerator', () => {
	it('should be instantiable', () => {
		let x = new BasicKoaCredGenerator()
		expect(x).toBeDefined()
	})

	it('should get identity', () => {
		let x = new BasicKoaCredGenerator(),
			identity = 'identity'

		expect(
			x.generateCredentialFromKoaContext({
				headers: { 'x-api-key': identity }
			})
		).toEqual({ identity })

		expect(
			x.generateCredentialFromKoaContext({
				headers: { authorization: 'Bearer ' + identity }
			})
		).toEqual({ identity })

		expect(
			x.generateCredentialFromKoaContext({
				headers: { authorization: 'Basic ' + identity }
			})
		).toEqual({ identity })

		expect(
			x.generateCredentialFromKoaContext({
				query: { token: identity }
			})
		).toEqual({ identity })
	})
})
