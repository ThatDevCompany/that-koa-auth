import { AuthContext, AuthContextType } from './authcontext'
import { User } from '@/types'

/**
 * Tests for Context
 */
describe('Context', () => {
	const testUser: User = { id: '1234' }
	const userContext = new AuthContext(AuthContextType.USER, testUser)
	const systemContext = new AuthContext(AuthContextType.SYSTEM)
	const guestContext = new AuthContext()

	/**
	 * General Tests
	 */
	it('should be instantiable', async () => {
		expect(userContext).toBeDefined()
		expect(systemContext).toBeDefined()
		expect(guestContext).toBeDefined()
	})

	it('should know if it is a system', async () => {
		expect(userContext.isSystem).toBeFalsy()
		expect(systemContext.isSystem).toBeTruthy()
		expect(guestContext.isSystem).toBeFalsy()
	})

	it('should know if it is a user', async () => {
		expect(userContext.isUser).toBeTruthy()
		expect(systemContext.isUser).toBeFalsy()
		expect(guestContext.isUser).toBeFalsy()
	})

	it('should know if it is a guest', async () => {
		expect(userContext.isGuest).toBeFalsy()
		expect(systemContext.isGuest).toBeFalsy()
		expect(guestContext.isGuest).toBeTruthy()
	})

})
