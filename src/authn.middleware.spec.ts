import { authn } from './authn.middleware'
import { ExampleSecurityDAO } from './securitydao'

/**
 * Tests for Context
 */
describe('Context', () => {
	/**
	 * General Tests
	 */
	it('should be a middleware factory', async () => {
		expect(authn).toBeDefined()
		expect(typeof authn).toBe('function')
		const test = authn(ExampleSecurityDAO)
		expect(test).toBeDefined()
		expect(typeof test).toBe('function')
	})

	it('should call authenticateToken and attach the context to the request', async () => {
		const test = authn(ExampleSecurityDAO)
		const ctx = { headers: {}, query: {}, uctx: null }
		const next = jasmine.createSpy('next')
		spyOn(ExampleSecurityDAO, 'contextFromToken').and.returnValue(
			Promise.resolve({})
		)
		await test(ctx, next)
		expect(ctx.uctx).toBeDefined()
		expect(next.calls.count()).toBe(1)
	})

	it('should attach a guest context if authentication fails', async () => {
		const test = authn(ExampleSecurityDAO)
		const ctx = { headers: {}, query: {}, uctx: null }
		const next = jasmine.createSpy('next')
		const context = {}
		await test(ctx, next)
		expect(ctx.uctx).toBeDefined()
		expect(next.calls.count()).toBe(1)
	})
})
