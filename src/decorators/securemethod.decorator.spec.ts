import { SecureMethod } from './securemethod.decorator'

/**
 * SecureMethod
 */
describe('SecureMethod', () => {
	let successAuth = {
			async authorize(...args) {
				return true
			}
		},
		failAuth = {
			async authorize(...args) {
				return false
			}
		}

	it('should be defined', async () => {
		expect(SecureMethod).toBeDefined()
	})

	it('should be a decorator factory', async () => {
		expect(typeof SecureMethod(successAuth, [])).toBe('function')
	})

	it('should wrap descriptor value', async () => {
		const target = null
		const propertyKey = 'test'
		const value = () => {}
		const descriptor = { value }
		SecureMethod(successAuth, [])(target, propertyKey, descriptor)
		expect(descriptor.value != value).toBeTruthy()
	})

	it('should call original method if no authorizer provided', async () => {
		const target = null
		const propertyKey = 'test'
		const fired = false
		const value = jasmine.createSpy('value')
		const descriptor = { value }
		await SecureMethod(null, [])(target, propertyKey, descriptor)
		await descriptor.value(null)
		expect(value.calls.count()).toBe(1)
	})

	it('should call original method if authorize ok', async () => {
		const target = null
		const propertyKey = 'test'
		const fired = false
		const value = jasmine.createSpy('value')
		const descriptor = { value }
		await SecureMethod(successAuth, [])(target, propertyKey, descriptor)
		await descriptor.value(null)
		expect(value.calls.count()).toBe(1)
	})

	it('should throw AuthError if authorize failed', async () => {
		const target = null
		const propertyKey = 'test'
		const fired = false
		const value = jasmine.createSpy('value')
		const descriptor = { value }
		await SecureMethod(failAuth, [])(target, propertyKey, descriptor)
		try {
			await descriptor.value(null)
			expect(false).toBeTruthy()
		} catch (e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
