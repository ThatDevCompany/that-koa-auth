import { FacebookAuthNProvider } from './facebook.authnprovider'
import {GoogleAuthNProvider} from "@/authnproviders/google.authnprovider";
import {AuthError} from "@/errors";

/**
 * Tests for FacebookAuthNProvider
 */
describe('FacebookAuthNProvider', () => {
	/**
	 * General Tests
	 */
	it('should be instantiable', async () => {
		expect(new FacebookAuthNProvider(null)).toBeDefined()
	})

	it('should throw an AuthError during authentication', async () => {
		try {
			expect(new FacebookAuthNProvider(null).authenticate(null)).toThrowError()
			expect(false).toBeTruthy()
		} catch(e) {
			expect(true).toBeTruthy()
			expect(e.status).toBe(401)
		}
	})
})
