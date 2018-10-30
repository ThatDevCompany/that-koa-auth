import { User } from '../models/user.model'
import { SecurityDAO } from '@/securitydao'

/**
 * An abstract AuthN Provider class
 */
export abstract class AuthNProvider {
	/* CONSTRUCTOR */
	constructor(public SecurityDAO: SecurityDAO) {}
}
