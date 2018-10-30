import { GoogleAuthNProvider } from './google.authnprovider'
import {AuthError} from "@/errors";

/**
 * Tests for GoogleAuthNProvider
 */
describe('GoogleAuthNProvider', () => {
	/**
	 * General Tests
	 */
	it('should be instantiable', async () => {
		expect(new GoogleAuthNProvider(null)).toBeDefined()
	})

	it('should throw an AuthError during authentication', async () => {
		try {
			expect(new GoogleAuthNProvider(null).authenticate(null)).toThrowError()
			expect(false).toBeTruthy()
		} catch(e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
