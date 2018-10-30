import { Permission } from './permission.model'

/**
 * An abstract Permission class
 */
export interface Role {
	key: string
	hasPermission(permission: Permission): boolean
}
