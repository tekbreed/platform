import { data, redirect } from "react-router";
import type { Route } from "./+types/subscribe";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
// import { checkHoneypot } from "@repo/utils/honeypot.server";
import { parseWithZod } from "@conform-to/zod/v4";
import { SubscriptionSchema } from "@repo/ui/composed/subscription-forms";
import { sendEmail, subscribeUser } from "@repo/utils/email.server";
import { WaitlistEmail } from "@repo/ui/email/waitlist";

export async function loader() {
  return redirect("/");
}

export async function action({ request }: Route.ActionArgs): Promise<unknown> {
  const formData = await request.formData();
  // await checkHoneypot(formData);
  const submission = await parseWithZod(formData, {
    schema: SubscriptionSchema.transform(async (data, ctx) => {
      const { name, email } = data;
      const response = await subscribeUser({ name, email });
      if (response.status !== "success") {
        ctx.addIssue({
          path: ["root"],
          code: "custom",
          message: "Invalid credentials.",
        });
        return z.NEVER;
      }
      void sendEmail({
        to: email,
        subject: "Welcome to TekBreed - You're on the waitlist!",
        react: <WaitlistEmail firstName={name?.split(" ")[0] || "Developer"} />,
      });
      return { response };
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return data(
      {
        result: { status: "error", ...submission.reply() },
        response: null,
      } as const,
      {
        status:
          submission.status === "error"
            ? StatusCodes.BAD_REQUEST
            : StatusCodes.OK,
      },
    );
  }

  if (!submission.value.response) {
    return data(
      {
        result: { status: "error", ...submission.reply() },
        response: null,
      } as const,
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }

  return { result: null, response: submission.value.response };
}
