import { Role } from './role.model'

export interface User {
	id: string
	tenantId: string
	passkeyMatches(passkey: string): Promise<boolean>
	roles(): Promise<Array<Role>>
}
