/**
 * A temporary authentication token
 */
export interface AuthToken {
	id: string
	userId: string
	tenantId: string

	isValid(): boolean
}
