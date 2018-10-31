import { AuthToken, User } from '@/models'

export interface SecurityDAO<U extends User, A extends AuthToken> {
	findUserById(tenantId: string, id: string): Promise<U>
	findUserByIdentity(tenantId: string, identity: string): Promise<U>
	findAuthTokenById(id: string): Promise<A>
}

export const ExampleSecurityDAO: SecurityDAO<User, AuthToken> = {
	findUserById(tenantId: string, id: string): Promise<User> {
		return null
	},
	findUserByIdentity(tenantId: string, identity: string): Promise<User> {
		return null
	},
	findAuthTokenById(id: string): Promise<AuthToken> {
		return null
	}
}
