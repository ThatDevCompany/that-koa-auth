import {Permission} from "@/types/permission";

/**
 * A type interface for Roles
 */
export interface Role {
	hasPermission(permission: Permission): boolean
}
export const ExampleRole: Role = {
	hasPermission(permission: Permission): boolean {
		return false
	}
}
