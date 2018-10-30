import { AuthToken } from '@/models/authtoken.model'
import { User } from '@/models/user.model'

export interface SecurityDAO {
	findUserById(tenantId: string, id: string): Promise<User>
	findUserByIdentity(tenantId: string, identity: string): Promise<User>
	findAuthTokenById(id: string): Promise<AuthToken>
}

export const ExampleSecurityDAO: SecurityDAO = {
	findUserById(tenantId: string, id: string): Promise<User> { return null },
	findUserByIdentity(tenantId: string, identity: string): Promise<User> { return null },
	findAuthTokenById(id: string): Promise<AuthToken> { return null }
}
