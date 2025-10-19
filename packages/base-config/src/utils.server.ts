import { honeypot } from "@repo/utils/honeypot.server";
import { getDomainUrl } from "@repo/utils/misc";
import { themeSessionResolver } from "@repo/utils/theme.server";
import { getToast } from "@repo/utils/toast.server";

export async function getAppLoaderData(request: Request) {
  const honeypotInputProps = await honeypot.getInputProps();
  const { getTheme } = await themeSessionResolver(request);
  const { toast: toastSession } = await getToast(request);
  const theme = getTheme();
  const env = undefined;
  const domain = getDomainUrl(request);
  return { theme, toastSession, honeypotInputProps, env, domain };
}
