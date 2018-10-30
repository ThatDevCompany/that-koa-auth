/**
 * A temporary authentication token
 */
export interface AuthToken {
	id: string
	userId: string
	tenantId: string

	isValid(): boolean
}

export const ExampleAuthToken: AuthToken = {
	id: '123',
	userId: '123',
	tenantId: '123',

	isValid() { return true }
}