import { AuthProviderType } from '@/authnproviders'

export interface Credentials {
	provider: AuthProviderType
	tenantId?: string
	identity?: string
	passkey?: string
}

export const ExampleCredentials: Credentials = {
	provider: AuthProviderType.BASIC
}
