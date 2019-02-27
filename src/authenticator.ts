import { User, AuthCredential } from '@/types'
import { AuthContext } from './authcontext'

/**
 * An AuthN plugin interface
 */
export interface Authenticator<U extends User> {
	generateAuthContext(credential: AuthCredential): Promise<AuthContext<U>>
}

export const ExampleAuthenticator: Authenticator<User> = {
	async generateAuthContext(credential: AuthCredential): Promise<AuthContext<User>> {
		return null
	}
}
