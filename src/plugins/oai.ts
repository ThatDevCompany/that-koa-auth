import * as oaiRouter from 'koa-oai-router'
import { AuthError } from '@/errors'
import { Authorizer } from '@/authorizer'
import { User } from '@/types'
import { AuthContext } from '@/authcontext'

/**
 * An Authentication plugin for the Koa OpenAPI Router system
 */
export class oaiAuthZ<
	U extends User,
	A extends AuthContext<U>
> extends oaiRouter.Plugin {
	pluginName = 'auth'
	field = 'x-oai-auth' // Any endpoint marked with x-oai-auth will have authz enforced
	args: {
		authorizer: Authorizer<U, A>
	}

	/**
	 * Setup the Plugin options
	 */
	async handler(docOptions) {
		const { endpoint, fieldValue } = docOptions
		const { authorizer } = this.args

		/* The Middleware itself */
		return async (ctx, next) => {
			// Authorize the user
			if (
				!(await authorizer.authorize(
					ctx.auth,
					fieldValue === true ? /* istanbul ignore next */ [] : fieldValue
				))
			) {
				throw new AuthError(`Unauthorized access to ${endpoint}`)
			}
			return next()
		}
	}
}
