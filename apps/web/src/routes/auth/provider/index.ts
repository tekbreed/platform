import type { Route } from "./+types/index";
import { redirect } from "react-router";
import { getReferrerRoute } from "@repo/utils/misc";
import { getRedirectCookieHeader } from "@repo/utils/redirect-cookie.server";
import { ProviderNameSchema } from "@repo/utils/connection";
import { handleMockAction } from "@repo/utils/connection.server";
import { authenticator } from "@repo/utils/auth.server";

export async function loader() {
  return redirect("/");
}

export async function action({ request, params }: Route.ActionArgs) {
  const providerName = ProviderNameSchema.parse(params.provider);
  try {
    await handleMockAction(providerName, request);
    return await authenticator.authenticate(providerName, request);
  } catch (error: unknown) {
    if (error instanceof Response) {
      const formData = await request.formData();
      const rawRedirectTo = formData.get("redirectTo");
      const redirectTo =
        typeof rawRedirectTo === "string"
          ? rawRedirectTo
          : getReferrerRoute(request);
      const redirectToCookie = getRedirectCookieHeader(redirectTo);
      if (redirectToCookie) {
        error.headers.append("set-cookie", redirectToCookie);
      }
    }
    throw error;
  }
}
