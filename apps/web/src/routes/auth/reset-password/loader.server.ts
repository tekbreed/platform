import { requireAnonymous } from "@repo/utils/auth.server";
import { resetPasswordEmailSessionKey } from "../forgot-password";
import { redirect } from "react-router";
import { verifySessionStorage } from "@repo/utils/verification.server";

export async function requireResetPasswordEmail(request: Request) {
  await requireAnonymous(request);
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const resetPasswordEmail = verifySession.get(resetPasswordEmailSessionKey);
  if (typeof resetPasswordEmail !== "string" || !resetPasswordEmail) {
    throw redirect("/auth/signin");
  }
  return resetPasswordEmail;
}
