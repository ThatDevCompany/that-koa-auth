import { Permission } from './permission.model'

/**
 * An abstract Permission class
 */
export interface Role {
	key: string
	hasPermission(permission: Permission): boolean
}

export const ExampleRole: Role = {
	key: '123',
	hasPermission(permission: Permission): boolean {
		return true
	}
}