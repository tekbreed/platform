import type { Route } from "./+types/media";
import { retrieveMediaFiles } from "@repo/utils/storage.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  return await retrieveMediaFiles(request, params);
}
