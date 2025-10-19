import { parseWithZod } from "@conform-to/zod/v4";
import { StatusCodes } from "http-status-codes";
import { prisma } from "@repo/database";
import { getPasswordHash } from "@/utils/auth.server";
import { requireResetPasswordEmail } from "./loader.server";
import { ResetPasswordSchema } from "./index";
import { data, redirect } from "react-router";
import { verifySessionStorage } from "@/utils/verification.server";

export async function handlePasswordReset(
  request: Request,
  formData: FormData,
) {
  const userEmail = await requireResetPasswordEmail(request);
  const submission = parseWithZod(formData, {
    schema: ResetPasswordSchema,
  });
  if (submission.status !== "success") {
    return data({ status: "error", ...submission.reply() } as const, {
      status:
        submission.status === "error"
          ? StatusCodes.BAD_REQUEST
          : StatusCodes.OK,
    });
  }

  const { password } = submission.value;
  const update = await prisma.user.update({
    where: { email: userEmail },
    select: { id: true },
    data: {
      password: {
        update: {
          hash: await getPasswordHash(password),
        },
      },
    },
  });
  if (!update) {
    return data({ status: "error", ...submission.reply() } as const, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
  const verifySession = await verifySessionStorage.getSession();
  throw redirect("/signin", {
    headers: {
      "set-cookie": await verifySessionStorage.destroySession(verifySession),
    },
  });
}
