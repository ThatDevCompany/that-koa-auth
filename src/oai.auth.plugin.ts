import * as oaiRouter from 'koa-oai-router'
import { authorize } from '@/utils'
import { AuthError } from '@/errors'

/**
 * An Authentication plugin for the Koa OpenAPI Router system
 */
export class AuthPlugin extends oaiRouter.Plugin {
	pluginName = 'auth'
	field = 'x-oai-auth' // Any endpoint marked with x-oai-auth will have authz enforced
	args: any

	/**
	 * Setup the Plugin options
	 */
	async handler(docOptions) {
		const { endpoint } = docOptions
		const { SecurityDAOService } = this.args

		/* The Middleware itself */
		return async (ctx, next) => {
			// Authorize the user
			if (!(await authorize(SecurityDAOService, ctx.uctx, []))) {
				throw new AuthError(`Unauthorized access to ${endpoint}`)
			}
			return next()
		}
	}
}
