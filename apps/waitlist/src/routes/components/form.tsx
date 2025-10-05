import type { Route } from "../+types/home";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { SubscriptionSchema } from "@repo/ui/composed/subscription-forms";
import { FormError } from "@repo/ui/composed/form-error";
import { useFetcher } from "react-router";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { useLoaderData } from "react-router";

export function FormSection() {
  const loaderData = useLoaderData<Route.ComponentProps["loaderData"]>();
  const fetcher = useFetcher();
  const isSubscribed = fetcher.data?.response?.status === "success";

  const [form, fields] = useForm({
    id: "waitlist-form",
    lastResult: fetcher?.data?.result,
    defaultValue: {
      intent: "waitlist",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SubscriptionSchema });
    },
    shouldValidate: "onSubmit",
  });

  return (
    <section id="waitlist" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="tracking-tight. text-3xl font-bold text-balance text-foreground sm:text-4xl">
            Be the first to experience the future
          </h2>
          <p className="mt-6 text-lg leading-8 text-pretty text-muted-foreground">
            Join our exclusive waitlist and get early access to the platform
            that will transform how you build software. Plus, receive a special
            launch discount when we go live
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          <Card className="border-border bg-card shadow-xl">
            {!isSubscribed ? (
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Join the Waitlist
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Get notified when we launch and receive exclusive early access
                </CardDescription>
              </CardHeader>
            ) : null}
            <CardContent>
              {isSubscribed ? (
                <div className="py-8 text-center">
                  <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    You&apos;re on the list!
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;ll notify you as soon as we launch. Thanks for your
                    interest!
                  </p>
                </div>
              ) : (
                <fetcher.Form
                  {...getFormProps(form)}
                  method="post"
                  action="/subscribe"
                  className="space-y-6"
                >
                  <HoneypotInputs />
                  <div className="space-y-4">
                    <div className="w-full">
                      <Input
                        {...getInputProps(fields.name, { type: "text" })}
                        placeholder="Tony Max"
                        className="mb-2 flex h-12 w-full rounded-lg border-2 px-6 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed"
                      />
                      <FormError errors={fields.name.errors} />
                    </div>
                    <div className="w-full">
                      <Input
                        {...getInputProps(fields.email, { type: "email" })}
                        placeholder="tonymax@tekbreed.com"
                        className="mb-2 flex h-12 w-full rounded-lg border-2 px-6 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed"
                      />
                      <FormError errors={fields.email.errors} />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
                    disabled={fetcher.state !== "idle"}
                  >
                    Join the Waitlist
                    {fetcher.state !== "idle" ? (
                      <Loader2 className="ml-2 animate-spin" />
                    ) : null}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By joining, you agree to receive updates about our platform.
                    We respect your privacy and will never spam you.
                  </p>
                  <FormError errors={form.allErrors.root || form.errors} />
                </fetcher.Form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {loaderData.subscribers?.data?.data?.length
                  ? loaderData.subscribers.data.data.length.toLocaleString()
                  : "13"}
              </div>
              <div className="text-sm text-muted-foreground">
                Developer
                {loaderData.subscribers?.data?.data?.length === 1
                  ? ""
                  : "s"}{" "}
                waiting
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">
                Launch discount
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                Feb. 1st, 2026
              </div>
              <div className="text-sm text-muted-foreground">
                Expected launch
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
