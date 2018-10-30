import { SecureMethod } from './securemethod.decorator'
import * as utils from '../utils'
import {AuthError} from "@/errors";

/**
 * Tests for SecureMethod
 */
describe('SecureMethod', () => {
	/**
	 * General Tests
	 */
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
		const descriptor = {value}
		SecureMethod(null, null)(target, propertyKey, descriptor)
		expect(descriptor.value != value).toBeTruthy()
	})

	it('should call original method if authorize ok', async () => {
		const s = spyOn(utils, 'authorize')
			.and
			.returnValue(Promise.resolve(true))
		const target = null
		const propertyKey = 'test'
		const fired = false
		const value = jasmine.createSpy('value')
		const descriptor = {value}
		await SecureMethod(null, null)(target, propertyKey, descriptor)
		await descriptor.value(null)
		expect(s.calls.count()).toBe(1)
		expect(value.calls.count()).toBe(1)
	})

	it('should throw AuthError if authorize failed', async () => {
		const s = spyOn(utils, 'authorize')
			.and
			.returnValue(Promise.resolve(false))
		const target = null
		const propertyKey = 'test'
		const fired = false
		const value = jasmine.createSpy('value')
		const descriptor = {value}
		await SecureMethod(null, null)(target, propertyKey, descriptor)
		try {
			await descriptor.value(null)
			expect(false).toBeTruthy()
		} catch(e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
