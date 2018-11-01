import { User } from '@/types'
import { Context } from '@/context'
import { Permission } from '@/types'
import { AuthService } from '@/authservice'

/**
 * An AuthZ plugin interface
 */
export interface Authorizer {
	authorize(uctx: Context, permissions: Array<Permission>): Promise<boolean>
}

export const ExampleAuthorizer: Authorizer = {
	async authorize(
		uctx: Context,
		permissions: Array<Permission>
	): Promise<boolean> {
		return false
	}
}
