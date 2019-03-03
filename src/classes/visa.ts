import { GeneralError } from 'that-koa-error'
import { User } from './user'

/**
 * VISA Type
 *
 * The type of VISA Granted
 */
export enum VISAType {
	USER = 'USER',
	SYSTEM = 'SYSTEM',
	GUEST = 'GUEST'
}

/**
 * VISA
 *
 * An endorsement indicating that the holder is allowed to
 * certain access privileges inside the system
 */
export class VISA<U extends User> {
	protected data: any = {}

	constructor(protected type: VISAType, public user: U = null) {
		if (type === VISAType.USER && !user) {
			throw new GeneralError('Incorrect VISA Creation')
		}
	}

	get isGuest() {
		return this.type === VISAType.GUEST
	}

	get isUser() {
		return this.type === VISAType.USER
	}

	get isSystem() {
		return this.type === VISAType.SYSTEM
	}
}

/**
 * VISA Class
 *
 * An interface for a VISA class
 */
export interface VISAClass<U extends User, V extends VISA<U>> {
	new (type: VISAType, ...args): V
}
