import { z } from "zod/v4";
import { data, redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "@repo/utils/email.server";
import { prisma } from "@repo/database";
import { verifySessionStorage } from "@/utils/verification.server";
import { Verification } from "@repo/ui/email/verification";
import { prepareVerification } from "../verify.server";
import { SignupSchema } from "@/components/auth-form";
import { onboardingSessionKey } from "../onboarding";

export async function handleSignUp(request: Request, formData: FormData) {
  const submission = await parseWithZod(formData, {
    schema: SignupSchema.superRefine(async (data, ctx) => {
      const user = await prisma.user.findFirst({
        where: { email: data.email },
        select: { id: true },
      });
      if (user) {
        ctx.addIssue({
          path: ["email"],
          code: "custom",
          message: "Email already in use.",
        });
        return z.NEVER;
      }
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return data({ status: "error", ...submission.reply() } as const, {
      status:
        submission.status === "error"
          ? StatusCodes.BAD_REQUEST
          : StatusCodes.OK,
    });
  }

  const { email } = submission.value;
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie"),
  );

  verifySession.set(onboardingSessionKey, email);
  const { verifyUrl, redirectTo, otp } = await prepareVerification({
    period: 10 * 60,
    request,
    type: "onboarding",
    target: email,
  });

  const response = await sendEmail({
    to: email,
    subject: `Welcome to TekBreed!`,
    react: <Verification code={otp} verificationUrl={verifyUrl.toString()} />,
  });

  if (response.status === "success") {
    return redirect(redirectTo.toString());
  } else {
    return data(
      { ...submission.reply({ formErrors: [response.error] }) },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
