import type { Route } from "./+types/index";
import { z } from "zod/v4";
import { motion } from "framer-motion";
import { data, Form, useSearchParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { getInputProps, useForm } from "@conform-to/react";
import { getFormProps } from "@conform-to/react";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { FormError } from "@repo/ui/composed/form-error";
import { Button } from "@repo/ui/components/button";
import { parseWithZod } from "@conform-to/zod/v4";
import { requireAnonymous } from "@/utils/auth.server";
import { verifySessionStorage } from "@/utils/verification.server";
import { RememberMeSchema } from "@repo/utils/user-validation";
import { useIsPending } from "@repo/utils/misc";
// import { generateMetadata } from "~/utils/meta";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { handleProviderOnboarding, requireData } from "./provider.server";
import { Icons } from "@repo/ui/composed/icons";

export const providerIdKey = "providerId";
export const prefilledProfileKey = "prefilledProfile";

export const OnboardingSchema = z.object({
  imageUrl: z.string().optional(),
  name: z.string(),
  redirectTo: z.string().optional(),
  rememberMe: RememberMeSchema,
});

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireAnonymous(request);
  const { email } = await requireData({ request, params });

  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const prefilledProfile = verifySession.get(prefilledProfileKey);

  return data({
    email,
    status: "idle",
    submission: {
      initialValue: (prefilledProfile ?? {}) as Record<string, unknown>,
    },
  });
}

export async function action({ request, params }: Route.ActionArgs) {
  return await handleProviderOnboarding(request, params);
}

export default function OnboardingProvider({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  // const metadata = generateMetadata({ title: "Onboarding" });
  const isSubmitting = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const email = loaderData.email;

  const [form, fields] = useForm({
    id: "onboarding-provider",
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: OnboardingSchema });
    },
    shouldValidate: "onBlur",
    defaultValue: { redirectTo },
  });

  return (
    <>
      {/* {metadata} */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-0 bg-card/80 shadow-xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome aboard {email}</CardTitle>
            <CardDescription>Please enter your details</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...getFormProps(form)} method="post" className="space-y-4">
              <input
                {...getInputProps(fields.redirectTo, { type: "hidden" })}
                // value={redirectTo ?? ""}
              />
              <HoneypotInputs />
              <div className="space-y-2">
                <Label htmlFor={fields.name.id}>Name</Label>
                <Input
                  {...getInputProps(fields.name, { type: "text" })}
                  placeholder="Tony Max"
                />
                <FormError errors={fields.name.errors} />
              </div>
              <div className="flex justify-between">
                <Label
                  htmlFor={fields.rememberMe.id}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <input
                    {...getInputProps(fields.rememberMe, {
                      type: "checkbox",
                    })}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  Remember Me
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                aria-label="Create account"
              >
                Create account{" "}
                {isSubmitting ? (
                  <Icons.loader2 className="ml-2 animate-spin" />
                ) : null}
              </Button>
              <FormError errors={form.allErrors.root || form.errors} />
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
