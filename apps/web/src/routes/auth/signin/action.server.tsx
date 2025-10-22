import { z } from "zod/v4";
import { parseWithZod } from "@conform-to/zod/v4";
import { SigninSchema } from "@/components/auth-form";
import { signin } from "@repo/utils/auth.server";
import { data } from "react-router";
import { StatusCodes } from "http-status-codes";
import { handleNewSession } from "@repo/utils/session.server";

export async function handleSignIn(request: Request, formData: FormData) {
  const submission = await parseWithZod(formData, {
    schema: SigninSchema.transform(async (data, ctx) => {
      const { email, password } = data;
      const session = await signin({ email, password });
      if (!session) {
        ctx.addIssue({
          path: ["root"],
          code: "custom",
          message: "Invalid credentials.",
        });
        return z.NEVER;
      }
      return { ...data, session };
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

  if (!submission.value.session) {
    return data({ status: "error", ...submission.reply() } as const, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }

  const { rememberMe, redirectTo, session } = submission.value;

  return await handleNewSession({
    request,
    session,
    redirectTo,
    rememberMe,
  });
}
