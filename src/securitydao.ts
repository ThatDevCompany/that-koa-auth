import { User } from '@/models'
import {Context} from "@/context";

export interface SecurityDAO<U extends User> {
	findUserById(tenantId: string, id: string): Promise<U>
	findUserByIdentity(tenantId: string, identity: string): Promise<U>
	contextFromToken(token: string): Promise<Context>
}

export const ExampleSecurityDAO: SecurityDAO<User> = {
	async findUserById(tenantId: string, id: string): Promise<User> {
		return null
	},
	async findUserByIdentity(tenantId: string, identity: string): Promise<User> {
		return null
	},
	async contextFromToken(token: string): Promise<Context> {
		return Context.Guest()
	}
}
