import { client } from "@repo/utils/content.server/loader"

import { homePageQuery } from "./queries"
import type { HomePageContent } from "./types"

export async function getHomePageContent() {
	return client.fetch<HomePageContent>(homePageQuery)
}
