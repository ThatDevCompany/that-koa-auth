import { assert } from 'that-koa-error'

/**
 * A Type enum for Contexts
 */
export enum ContextType {
	USER = 'USER',
	SYSTEM = 'SYSTEM',
	GUEST = 'GUEST'
}

/**
 * An Auth Context class
 */
export class Context {
	constructor(
		public type: ContextType = ContextType.GUEST,
		public userId?: string,
		public tenantId?: string,
		public data: any = {}
	) {
		assert(type != ContextType.USER || userId, 'UserID missing in Context')
	}

	get isGuest() {
		return this.type === ContextType.GUEST
	}

	get isUser() {
		return this.type === ContextType.USER
	}

	get isSystem() {
		return this.type === ContextType.SYSTEM
	}

	static Guest() {
		return new Context(ContextType.GUEST)
	}

	static System(tentantId?: string) {
		return new Context(ContextType.SYSTEM, null, tentantId)
	}

	static User(userId: string, tentantId?: string) {
		return new Context(ContextType.USER, userId, tentantId)
	}
}
