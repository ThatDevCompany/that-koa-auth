import { User } from '@/types'
import { AuthContext } from '@/authcontext'
import { Permission } from '@/types'

/**
 * An AuthZ plugin interface
 */
export interface Authorizer<U extends User, A extends AuthContext<U>> {
	authorize(auth: A, permissions: Permission[]): Promise<boolean>
}

export const ExampleAuthorizer: Authorizer<User, AuthContext<User>> = {
	async authorize(
		auth: AuthContext<User>,
		permissions: Permission[]
	): Promise<boolean> {
		return false
	}
}
