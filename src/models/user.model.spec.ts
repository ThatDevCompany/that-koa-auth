import { ExampleUser } from './user.model'

/**
 * Tests for User
 */
describe('User', () => {
	/**
	 * General Tests
	 */
	it('should be defined', async () => {
		expect(ExampleUser).toBeDefined()
	})

	it('should allow passkey matching', async () => {
		expect(await ExampleUser.passkeyMatches('')).toBeTruthy()
	})

	it('should have a roles array', async () => {
		expect((await ExampleUser.roles()) instanceof Array).toBeTruthy()
	})
})
