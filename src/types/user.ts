import { Role } from './role'

/**
 * A type interface for a User
 */
export type User = {
	id: string
	tenantId: string
}

export const ExampleUser: User = {
	id: '123',
	tenantId: '123'
}
