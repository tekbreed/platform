import type { HomePageContent } from "./types";
import { homePageQuery } from "./queries";
import { client } from "@repo/utils/content.server/loader";

export async function getHomePageContent() {
  return client.fetch<HomePageContent>(homePageQuery);
}
