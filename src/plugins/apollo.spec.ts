import { apolloAuthZ, apolloContext } from './apollo'
import { expectAsyncToThrow } from 'that-koa-error'
import { Authorizer } from '@/authorizer'

/**
 * Tests for apolloAuthZ
 */
describe('apolloAuthZ', () => {
	let auth: Authorizer = {
			async authorize() {
				return Promise.resolve(true)
			}
		},
		authFail: Authorizer = {
			async authorize() {
				return Promise.resolve(false)
			}
		}

	it('should block function if no authorizer provided', async () => {
		const spy = jasmine.createSpy()
		const fnc = apolloAuthZ(null, spy)
		await expectAsyncToThrow(() => fnc(null, null, null))
	})

	it('should block function if authorization fails', async () => {
		const spy = jasmine.createSpy()
		const fnc = apolloAuthZ(authFail, spy)
		await expectAsyncToThrow(() => fnc(null, null, null))
	})

	it('should call function if authorization succeeds', async () => {
		const spy = jasmine.createSpy('')
		const fnc = apolloAuthZ(auth, spy)
		await fnc(null, null, null)
		expect(spy).toHaveBeenCalled()
	})
})

/**
 * Tests for apolloContext
 */
describe('apolloContext', () => {
	it('should return a function to extract the auth context from an apollo context', async () => {
		const fnc = apolloContext(),
			auth = {}
		expect(fnc({ ctx: { auth } })).toBe(auth)
	})
})
