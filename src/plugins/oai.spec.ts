import { oaiAuthZ } from './oai'
import {expectAsyncToThrow} from "../../../that-koa-error/src/utils/expectAsyncToThrow";

/**
 * Tests for oaiAuthZ
 */
describe('oaiAuthZ', () => {

	it('should be instantiable', async () => {
		expect(new oaiAuthZ()).toBeDefined()
	})

	it('should have a handler which throws errors if unauthorized', async () => {
		const oai = new oaiAuthZ()
		oai.args = {
			authorizer: {
				authorize() { return Promise.resolve(false) }
			}
		}
		const handler = await oai.handler({ endpoint: '' })
		const next = jasmine.createSpy('next')
		await expectAsyncToThrow(() => handler({ uctx: {} }, next))
		expect(next).not.toHaveBeenCalled()
	})

	it('should have a handler which calls next if authorized', async () => {
		const oai = new oaiAuthZ()
		oai.args = {
			authorizer: {
				authorize() { return Promise.resolve(true) }
			}
		}
		const handler = await oai.handler({ endpoint: '' })
		const next = jasmine.createSpy('next')
		await handler({ uctx: {} }, next)
		expect(next).toHaveBeenCalled()
	})

})
