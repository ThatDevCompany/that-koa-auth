import * as oaiRouter from 'koa-oai-router'
import { AuthError } from '@/errors'
import { Authorizer } from '@/authorizer'

/**
 * An Authentication plugin for the Koa OpenAPI Router system
 */
export class oaiAuthZ extends oaiRouter.Plugin {
	pluginName = 'auth'
	field = 'x-oai-auth' // Any endpoint marked with x-oai-auth will have authz enforced
	args: {
		authorizer: Authorizer
	}

	/**
	 * Setup the Plugin options
	 */
	async handler(docOptions) {
		const { endpoint } = docOptions

		const { authorizer } = this.args

		/* The Middleware itself */
		return async (ctx, next) => {
			// Authorize the user
			if (!(await authorizer.authorize(ctx.uctx, []))) {
				throw new AuthError(`Unauthorized access to ${endpoint}`)
			}
			return next()
		}
	}
}
