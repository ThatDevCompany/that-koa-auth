import { koaAuthN } from './koa'
import { Context } from '@/context'
import {Authenticator} from '@/authenticator'
import {User} from "@/types";

/**
 * Tests for Context
 */
describe('Context', () => {

	let noAuth: Authenticator<User> = {
		async authenticate(ctx: any): Promise<{ user: User }> {
			return null
		}
	}
	let auth: Authenticator<User> = {
		async authenticate(ctx: any): Promise<{ user: any }> {
			return Promise.resolve({ user: { id: '1234', tenantId: '2345' }, data: null })
		}
	}

	/**
	 * General Tests
	 */
	it('should be a middleware factory', async () => {
		expect(koaAuthN).toBeDefined()
		expect(typeof koaAuthN).toBe('function')
		const test = koaAuthN(noAuth)
		expect(test).toBeDefined()
		expect(typeof test).toBe('function')
	})

	it('should call authenticateToken and attach the context to the request', async () => {
		const test = koaAuthN(noAuth)
		const ctx = { headers: {}, query: {}, uctx: null }
		const next = jasmine.createSpy('next')
		spyOn(noAuth, 'authenticate').and.returnValue(
			Promise.resolve(Context.Guest())
		)
		await test(ctx, next)
		expect(ctx.uctx).toBeDefined()
		expect(next.calls.count()).toBe(1)
	})

	it('should attach a guest context if authentication fails', async () => {
		const test = koaAuthN(noAuth)
		const ctx = { headers: {}, query: {}, uctx: null }
		const next = jasmine.createSpy('next')
		await test(ctx, next)
		expect(ctx.uctx).toBeDefined()
		expect(ctx.uctx.isGuest).toBeTruthy()
		expect(next.calls.count()).toBe(1)
	})

	it('should attach a user context if authentication succeeds', async () => {
		const test = koaAuthN(auth)
		const ctx = { headers: {}, query: {}, uctx: null }
		const next = jasmine.createSpy('next')
		await test(ctx, next)
		expect(ctx.uctx).toBeDefined()
		expect(ctx.uctx.isUser).toBeTruthy()
		expect(next.calls.count()).toBe(1)
	})
})
