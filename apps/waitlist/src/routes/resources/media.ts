import { retrieveMediaFiles } from "@repo/utils/storage.server"

import type { Route } from "./+types/media"

export async function loader({ request, params }: Route.LoaderArgs) {
	return await retrieveMediaFiles(request, params)
}
