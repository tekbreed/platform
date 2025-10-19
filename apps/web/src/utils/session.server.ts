import { createCookieSessionStorage, redirect } from "react-router";
import { safeRedirect } from "remix-utils/safe-redirect";
import { combineResponseInits } from "@repo/utils/misc";
import { sessionKey } from "./auth.server";
import { baseUrl } from "@repo/utils/constants/config";

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__tb_session",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    ...(process.env.NODE_ENV === "production"
      ? {
          domain: baseUrl,
          secure: true,
        }
      : {
          domain: "localhost",
          secure: false,
        }),
  },
});

export async function handleNewSession(
  {
    request,
    session,
    redirectTo,
    rememberMe = undefined,
  }: {
    request: Request;
    session: { userId: string; id: string; expirationDate: Date };
    redirectTo?: string;
    rememberMe?: "true" | undefined;
  },
  responseInit?: ResponseInit,
) {
  // if (await shouldRequestTwoFA({ request, userId: session.userId })) {
  //   const verifySession = await verifySessionStorage.getSession();
  //   verifySession.set(unverifiedSessionIdKey, session.id);
  //   verifySession.set(rememberKey, remember);
  //   const redirectUrl = getRedirectToUrl({
  //     request,
  //     type: twoFAVerificationType,
  //     target: session.userId,
  //   });
  //   return redirect(
  //     redirectUrl.toString(),
  //     combineResponseInits(
  //       {
  //         headers: {
  //           "set-cookie":
  //             await verifySessionStorage.commitSession(verifySession),
  //         },
  //       },
  //       responseInit,
  //     ),
  //   );
  // } else {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie"),
  );
  authSession.set(sessionKey, session.id);
  console.log("FINAL", redirectTo);

  return redirect(
    safeRedirect(redirectTo),
    combineResponseInits(
      {
        headers: {
          "set-cookie": await authSessionStorage.commitSession(authSession, {
            expires: rememberMe ? session.expirationDate : undefined,
          }),
        },
      },
      responseInit,
    ),
  );
  // }
}
