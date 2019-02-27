import { User, AuthCredential } from '@/types'
import { AuthContext } from './authcontext'

/**
 * An AuthN plugin interface
 */
export interface Authenticator<
	U extends User,
	C extends AuthCredential,
	A extends AuthContext<U>
> {
	generateAuthContext(credential: C): Promise<A>
	generateGuestContext(): Promise<A>
}

export const ExampleAuthenticator: Authenticator<
	User,
	AuthCredential,
	AuthContext<User>
> = {
	async generateAuthContext(
		credential: AuthCredential
	): Promise<AuthContext<User>> {
		return null
	},

	async generateGuestContext(): Promise<AuthContext<User>> {
		return new AuthContext()
	}
}
