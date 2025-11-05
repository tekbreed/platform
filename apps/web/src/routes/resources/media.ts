import { redirect } from "react-router";
import { StatusCodes } from "http-status-codes";
import type { Route } from "./+types/media";
import { invariant } from "@repo/utils/misc";

export type FileType = "youtube" | "bunny" | "image";

export const bunnyStorageZone = "https://cdn.tekbreed.com";
export const youtubeBaseUrl = "https://www.youtube.com";
export const bunnyBaseUrl = "https://iframe.mediadelivery.net";

export async function loader({ request, params }: Route.LoaderArgs) {
  const fileId = params.fileId;
  invariant(fileId, "File ID is required");

  const url = new URL(request.url);
  const fileType = url.searchParams.get("type") as FileType;
  invariant(fileType, "File Type is required");

  let redirectUrl: string;

  switch (fileType) {
    case "image":
      redirectUrl = `${bunnyStorageZone}/images/${encodeURIComponent(fileId)}`;
      break;
    case "bunny":
      redirectUrl = `${bunnyBaseUrl}/embed/${process.env.BUNNY_LIBRARY_ID}/${fileId}?autoplay=0`;
      break;
    case "youtube":
      redirectUrl = `${youtubeBaseUrl}/embed/${fileId}?rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`;
      break;
    default:
      throw new Response(`Invalid file type ${fileType}`, {
        status: StatusCodes.BAD_REQUEST,
      });
  }
  return redirect(redirectUrl, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
