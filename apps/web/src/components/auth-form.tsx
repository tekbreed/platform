import type { Route as SigninRoute } from "../routes/auth/signin/+types/index";
import type { Route as SignupRoute } from "../routes/auth/signup/+types/index";
import { z } from "zod/v4";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { Form, Link, useSearchParams } from "react-router";
import { getInputProps, getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { FormError } from "@repo/ui/composed/form-error";
import { ConnectionForm } from "./connection-form";
import { useRedirectTo } from "@repo/utils/hooks/use-redirect-to";
import { getImgSrc, useIsPending } from "@repo/utils/misc";
import { EmailSchema, PasswordSchema } from "@repo/utils/user-validation";
import { Icons } from "@repo/ui/composed/icons";
import { useSmartGoBack } from "@repo/utils/hooks/use-smart-go-back";

import { FormConsent } from "./form-consent";

const BaseSchema = z.object({
  email: EmailSchema,
  redirectTo: z.string().optional(),
  rememberMe: z.string().optional(),
});

export const SignupSchema = BaseSchema;

export const SigninSchema = BaseSchema.extend({
  password: PasswordSchema,
});

export type Action = "signin" | "signup";

const formContent = {
  title: {
    signin: "Welcome Back",
    signup: "Let's Begin",
  },
  description: {
    signin: "Please enter your credentials",
    signup: "Enter your email to continue",
  },
  redirect: {
    signin: "Don't have an account?",
    signup: "Already have an account?",
  },
  button: {
    signin: "Sign In",
    signup: "Submit",
  },
};

export function AuthForm({
  action,
  actionData,
}: {
  action: Action;
  actionData:
    | SignupRoute.ComponentProps["actionData"]
    | SigninRoute.ComponentProps["actionData"];
}) {
  const isSignin = action === "signin";

  const isSubmitting = useIsPending();
  const goBack = useSmartGoBack();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") ?? "";
  const params = new URLSearchParams({ redirectTo });
  const [form, fields] = useForm({
    id: `${action}-form`,
    lastResult: actionData,
    defaultValue: { redirectTo },
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: isSignin ? SigninSchema : SignupSchema,
      });
    },
    shouldValidate: "onSubmit",
  });
  return (
    <div className="relative z-10 w-full max-w-md">
      <Button onClick={() => goBack("/")} variant="link" className="mb-4">
        <Icons.arrowLeft className="h-6 w-8" /> Back
      </Button>
      <Card className="border-0 bg-card/80 shadow-xl backdrop-blur-sm">
        <FormHeader action={action} />
        <CardContent className="space-y-4">
          <Form
            {...getFormProps(form)}
            action={`/${action}`}
            method="post"
            className="space-y-4"
          >
            <HoneypotInputs />
            <input
              {...getInputProps(fields.redirectTo, { type: "hidden" })}
              // value={redirectTo ?? ""}
            />
            <div className="space-y-2">
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input
                {...getInputProps(fields.email, { type: "email" })}
                placeholder="tonymax@tekbreed.com"
              />
              <FormError errors={fields.email.errors} />
            </div>
            {isSignin ? (
              <div className="space-y-2">
                <Label htmlFor={(fields as any).password.id}>Password</Label>
                <Input
                  {...getInputProps((fields as any).password, {
                    type: "password",
                  })}
                  placeholder="••••••"
                />
                <FormError errors={(fields as any).password.errors} />
              </div>
            ) : null}
            {isSignin ? (
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

                <Link
                  to={"/forgot-password"}
                  className="text-sm text-blue-700 dark:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            ) : null}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              aria-label={formContent.button[action]}
            >
              {formContent.button[action]}
              {isSubmitting ? (
                <Icons.loader2 className="ml-2 animate-spin" />
              ) : null}
            </Button>
            <FormError
              errors={form.allErrors.root || form.errors}
              className="-mt-3"
            />
          </Form>
          <FormFooter action={action} />
        </CardContent>
      </Card>
    </div>
  );
}

function FormHeader({ action }: { action: Action }) {
  return (
    <CardHeader className="text-center">
      <div className="mx-auto flex w-full items-center justify-center pb-4">
        <img
          src={getImgSrc({ fileKey: "tekbreedlogo.png" })}
          alt="TekBreed"
          className="size-10"
        />
      </div>
      <CardTitle className="text-2xl">{formContent.title[action]}</CardTitle>
      <CardDescription>{formContent.description[action]}</CardDescription>
    </CardHeader>
  );
}

function FormFooter({ action }: { action: Action }) {
  const redirectTo = useRedirectTo();
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="rounded-md bg-background px-2 text-muted-foreground">
            OR
          </span>
        </div>
      </div>
      <div className="w-full">
        <ConnectionForm
          redirectTo={redirectTo}
          providerName="github"
          action={action}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {formContent.redirect[action]}{" "}
          <Link
            to={{
              pathname: action === "signin" ? "/signup" : "/signin",
              search: redirectTo,
            }}
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {action === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
      <FormConsent action={action} />
    </>
  );
}
