import { SecureMethod } from './securemethod.decorator'

/**
 * SecureMethod
 */
describe('SecureMethod', () => {
	it('should be defined', async () => {
		expect(SecureMethod).toBeDefined()
	})

	it('should be a decorator factory', async () => {
		expect(typeof SecureMethod(null, null)).toBe('function')
	})

	it('should wrap descriptor value', async () => {
		const target = null
		const propertyKey = 'test'
		const value = () => {}
		const descriptor = { value }
		SecureMethod(null, null)(target, propertyKey, descriptor)
		expect(descriptor.value != value).toBeTruthy()
	})

	it('should call original method if authorize ok', async () => {
		const target = null
		const propertyKey = 'test'
		const fired = false
		const value = jasmine.createSpy('value')
		const descriptor = { value }
		await SecureMethod(null, null)(target, propertyKey, descriptor)
		await descriptor.value(null)
		expect(value.calls.count()).toBe(1)
	})

	it('should throw AuthError if authorize failed', async () => {
		const target = null
		const propertyKey = 'test'
		const fired = false
		const value = jasmine.createSpy('value')
		const descriptor = { value }
		await SecureMethod(null, null)(target, propertyKey, descriptor)
		try {
			await descriptor.value(null)
			expect(false).toBeTruthy()
		} catch (e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
