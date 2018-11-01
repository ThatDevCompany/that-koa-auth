import { User } from '@/types'

/**
 * An AuthN plugin interface
 */
export interface Authenticator<U extends User> {
	authenticate(ctx: any): Promise<U>
}

export const ExampleAuthenticator: Authenticator<User> = {
	async authenticate(ctx: any): Promise<User> {
		return null
	}
}
