import { Passport } from './passport'

/**
 * Passport
 */
describe('Passport', () => {
	it('should be instantiable', async () => {
		const test = new Passport()
		expect(test).toBeDefined()
	})
})
