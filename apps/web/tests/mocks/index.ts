import closeWithGrace from "close-with-grace"
import { setupServer } from "msw/node"

// import { handlers as bunnyHandlers } from "@repo/tests-config/mocks/bunny"
import { handlers as discordHandlers } from "@repo/tests-config/mocks/discord"
import { handlers as miscHandlers } from "@repo/tests-config/mocks/misc"
import { handlers as resendHandlers } from "@repo/tests-config/mocks/resend"
import { handlers as sanityHandlers } from "@repo/tests-config/mocks/sanity"
import { handlers as vectorHandlers } from "@repo/tests-config/mocks/vector"
import { handlers as voyageHandlers } from "@repo/tests-config/mocks/vogage"
import { handlers as youtubeHandlers } from "@repo/tests-config/mocks/youtube"

import { handlers as githubHandlers } from "./github"
import { handlers as polarHandlers } from "./polar"

export const server = setupServer(
	...miscHandlers,
	...resendHandlers,
	// ...bunnyHandlers,
	...sanityHandlers,
	...githubHandlers,
	...polarHandlers,
	...voyageHandlers,
	...vectorHandlers,
	...discordHandlers,
	...youtubeHandlers,
)
server.listen({ onUnhandledRequest: "warn" })
console.info("🔶 Mock server installed")

closeWithGrace(() => {
	server.close()
})
