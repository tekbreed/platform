import { prisma } from "@repo/database";
import { honeypot } from "@repo/utils/honeypot.server";
import { combineHeaders, getDomainUrl } from "@repo/utils/misc";
import { themeSessionResolver } from "@repo/utils/theme.server";
import { sessionKey, signout } from "@repo/utils/auth.server";
import { getToast } from "@repo/utils/toast.server";
import { authSessionStorage } from "@repo/utils/session.server";
import { data } from "react-router";
import { getEnv } from "@repo/utils/env.server";

export async function getAppLoaderData(request: Request) {
  const honeypotInputProps = await honeypot.getInputProps();
  const { getTheme } = await themeSessionResolver(request);
  const { toast: toastSession, headers: toastHeaders } =
    await getToast(request);
  const theme = getTheme();
  const env = getEnv();
  const domain = getDomainUrl(request);

  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie"),
  );

  const sessionId: string = authSession.get(sessionKey);
  const session = sessionId
    ? await prisma.session.findUnique({
        where: { id: sessionId },
        select: { userId: true },
      })
    : null;

  const user = session?.userId
    ? await prisma.user.findUnique({
        where: { id: session.userId },
        select: {
          id: true,
          email: true,
          name: true,
          isSubscribedToNewsletter: true,
          image: { select: { fileKey: true, altText: true } },
          roles: {
            select: {
              name: true,
              permissions: {
                select: { access: true, action: true, entity: true },
              },
            },
          },
        },
      })
    : null;

  if (sessionId && !user) {
    await signout({ request, redirectTo: "/" });
  }
  return data(
    { user, theme, toastSession, honeypotInputProps, env, domain },
    { headers: combineHeaders(toastHeaders) },
  );
}
