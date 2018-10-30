import { BasicAuthNProvider } from './basic.authnprovider'

/**
 * Tests for BasicAuthNProvider
 */
describe('BasicAuthNProvider', () => {
	/**
	 * General Tests
	 */
	it('should be instantiable', async () => {
		expect(new BasicAuthNProvider(null)).toBeDefined()
	})
})
