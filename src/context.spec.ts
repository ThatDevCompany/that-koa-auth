import { Context, ContextType } from './context'

/**
 * Tests for Context
 */
describe('Context', () => {
	const userContext = new Context(ContextType.USER, '123', '123')
	const systemContext = new Context(ContextType.SYSTEM)
	const guestContext = new Context()

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

	it('should generate a system context', async () => {
		expect(Context.System()).toBeDefined()
	})

	it('should generate a guest context', async () => {
		expect(Context.Guest()).toBeDefined()
	})

	it('should generate a user context', async () => {
		expect(Context.User('1234')).toBeDefined()
	})
})
