import { User, Tenant } from '@/types'
import { AuthContext, AuthContextType } from '@/authcontext'

/**
 * The Context class
 */
export class TenantedAuthContext<
	U extends User,
	T extends Tenant
> extends AuthContext<U> {
	constructor(
		public type: AuthContextType = AuthContextType.GUEST,
		public user: U = null,
		public tentant: T = null,
		public data: object = {}
	) {
		super(type, user, data)
	}

	get isGuest() {
		return this.type === AuthContextType.GUEST
	}

	get isUser() {
		return this.type === AuthContextType.USER
	}

	get isSystem() {
		return this.type === AuthContextType.SYSTEM
	}
}
