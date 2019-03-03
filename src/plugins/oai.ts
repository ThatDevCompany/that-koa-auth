import * as oaiRouter from 'koa-oai-router'
import { AuthError } from '@/errors'
import * as C from '@/classes'

/**
 * An Authentication plugin for the Koa OpenAPI Router system
 */
export function oaiAuthZ<U extends C.User, V extends C.VISA<U>>(
	authorize: (visa: V, ...args) => Promise<boolean>
): oaiRouter.Plugin {
	class oaiPlugin extends oaiRouter.Plugin {
		pluginName = 'auth'
		field = 'x-oai-auth' // Any endpoint marked with x-oai-auth will have authz enforced
		args: {}

		/**
		 * Setup the Plugin options
		 */
		async handler(docOptions) {
			const { endpoint, fieldValue } = docOptions

			/* The Middleware itself */
			return async (ctx, next) => {
				// Authorize the user
				if (!(await authorize(ctx.visa, fieldValue))) {
					throw new AuthError(`Unauthorized access to ${endpoint}`)
				}
				return next()
			}
		}
	}

	return oaiPlugin
}
