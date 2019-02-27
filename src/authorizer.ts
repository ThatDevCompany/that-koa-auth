import { User } from '@/types'
import { AuthContext } from '@/authcontext'
import { Permission } from '@/types'

/**
 * An AuthZ plugin interface
 */
export interface Authorizer<U extends User> {
	authorize(auth: AuthContext<U>, permissions: Permission[]): Promise<boolean>
}

export const ExampleAuthorizer: Authorizer<User> = {
	async authorize(auth: AuthContext<User>, permissions: Permission[]): Promise<boolean> {
		return false
	}
}
