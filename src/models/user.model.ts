import { Role } from './role.model'

/**
 * Interface for a User
 */
export interface User {
	id: string
	tenantId: string
	passkeyMatches(passkey: string): Promise<boolean>
	roles(): Promise<Array<Role>>
}

export const ExampleUser: User = {
	id: '123',
	tenantId: '123',
	async passkeyMatches(passkey: string): Promise<boolean> {
		return true
	},
	async roles(): Promise<Array<Role>> {
		return []
	}
}