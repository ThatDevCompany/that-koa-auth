import { AuthCredential, User } from '@/types'
import { AuthContext, AuthContextType } from './authcontext'

/**
 * An AuthN plugin interface
 */
export interface Authenticator<
	U extends User,
	C extends AuthCredential,
	A extends AuthContext<U>
> {
	userContext(credential: C, ...args): Promise<A>
	systemContext(...args): Promise<A>
	guestContext(...args): Promise<A>
}

export const ExampleAuthenticator: Authenticator<
	User,
	AuthCredential,
	AuthContext<User>
> = {
	async userContext(credential: AuthCredential): Promise<AuthContext<User>> {
		return new AuthContext(AuthContextType.USER, {} as User, null)
	},

	async systemContext(): Promise<AuthContext<User>> {
		return new AuthContext(AuthContextType.SYSTEM, null, null)
	},

	async guestContext(): Promise<AuthContext<User>> {
		return new AuthContext(AuthContextType.GUEST, null, null)
	}
}
