import { assert } from 'that-koa-error'
import { User } from '@/types'

/**
 * A Type enum for Contexts
 */
export enum AuthContextType {
	USER = 'USER',
	SYSTEM = 'SYSTEM',
	GUEST = 'GUEST'
}

/**
 * The Context class
 */
export class AuthContext<U extends User> {
	constructor(
		public type: AuthContextType = AuthContextType.GUEST,
		public user: U = null,
		public data: object = {}
	) {
		assert(type != AuthContextType.USER || user, 'User missing in Context')
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
