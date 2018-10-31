import { User, AuthToken } from '@/models'
import { Credentials } from '@/credentials'

/**
 * An AuthN Provider interface
 */
export interface AuthNProvider<U extends User, A extends AuthToken> {
	authenticate(credentials: Credentials): Promise<U>
}
