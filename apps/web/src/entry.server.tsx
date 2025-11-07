import { handleRequest } from "@repo/base-config/entry.server"

// import { getEnv, init } from "@repo/utils/env.server";

const { MOCKS } = process.env
const isMocks = MOCKS === "true"

// init()
// global.env = getEnv()
;(async () => {
	if (isMocks) {
		await import("../tests/mocks/index")
	}
})()

export default handleRequest
