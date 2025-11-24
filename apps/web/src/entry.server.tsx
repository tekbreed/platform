import { handleRequest } from "@repo/base-config/entry.server"

const { MOCKS } = process.env
const isMocks = MOCKS === "true"

;(async () => {
	if (isMocks) {
		await import("../tests/mocks/index")
	}
})()

export default handleRequest
