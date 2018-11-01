import { koaAuthN } from './koa'
import { Context } from '@/context'
import { ExampleAuthenticator } from '@/authenticator'

/**
 * Tests for Context
 */
describe('Context', () => {
	/**
	 * General Tests
	 */
	it('should be a middleware factory', async () => {
		expect(koaAuthN).toBeDefined()
		expect(typeof koaAuthN).toBe('function')
		const test = koaAuthN(ExampleAuthenticator)
		expect(test).toBeDefined()
		expect(typeof test).toBe('function')
	})

	it('should call authenticateToken and attach the context to the request', async () => {
		const test = koaAuthN(ExampleAuthenticator)
		const ctx = { headers: {}, query: {}, uctx: null }
		const next = jasmine.createSpy('next')
		spyOn(ExampleAuthenticator, 'authenticate').and.returnValue(
			Promise.resolve(Context.Guest())
		)
		await test(ctx, next)
		expect(ctx.uctx).toBeDefined()
		expect(next.calls.count()).toBe(1)
	})

	it('should attach a guest context if authentication fails', async () => {
		const test = koaAuthN(ExampleAuthenticator)
		const ctx = { headers: {}, query: {}, uctx: null }
		const next = jasmine.createSpy('next')
		await test(ctx, next)
		expect(ctx.uctx).toBeDefined()
		expect(next.calls.count()).toBe(1)
	})
})
