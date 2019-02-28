import { User } from '@/types'
import { AuthContext } from '@/authcontext'
import { Permission } from '@/types'
import { AuthService } from '@/authservice'

/**
 * An AuthZ plugin interface
 */
export interface Authorizer<U extends User, A extends AuthContext<U>> {
	authorize(auth: A, permissions: Permission[]): Promise<boolean>
}

export const ExampleAuthorizer: Authorizer<User, AuthContext<User>> = {

	// istanbul ignore next
	async authorize(
		auth: AuthContext<User>,
		permissions: Permission[]
	): Promise<boolean> {
		return false
	}
}
