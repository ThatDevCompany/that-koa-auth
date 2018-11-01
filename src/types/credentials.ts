/**
 * A type interface for Credentials
 */
export type Credentials = {
	provider?: string
	tenantId?: string
	identity?: string
	passkey?: string
}

export const ExampleCredentials: Credentials = {}
