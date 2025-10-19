import { requireAnonymous } from "@/utils/auth.server";
import { verifySessionStorage } from "@/utils/verification.server";
import { resetPasswordEmailSessionKey } from "../forgot-password";
import { redirect } from "react-router";

export async function requireResetPasswordEmail(request: Request) {
  await requireAnonymous(request);
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const resetPasswordEmail = verifySession.get(resetPasswordEmailSessionKey);
  if (typeof resetPasswordEmail !== "string" || !resetPasswordEmail) {
    throw redirect("/signin");
  }
  return resetPasswordEmail;
}
