import { z } from "zod/v4";
import type { Route } from "../+types/index";
import { useActionData, useFetcher, useLoaderData } from "react-router";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { EmailSchema, NameSchema } from "@repo/utils/user-validation";
import { useIsPending } from "@repo/utils/misc";
import { Icons } from "@repo/ui/composed/icons";
import { Container } from "./container";
import { FormError } from "@repo/ui/composed/form-error";

export const ACCOUNT_INFORMATION_INTENT = "update-profile";

export const AcccountInformationSchema = z.object({
  name: NameSchema,
  email: EmailSchema,
  intent: z.literal(ACCOUNT_INFORMATION_INTENT),
});

export function AccountInformation() {
  const fetcher = useFetcher();
  const actionData = useActionData() as Route.ComponentProps["actionData"];
  const loaderData = useLoaderData() as Route.ComponentProps["loaderData"];

  const user = loaderData.user;
  const isSaving = useIsPending();

  const [form, fields] = useForm({
    id: "account-information",
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AcccountInformationSchema });
    },
    shouldValidate: "onBlur",
    defaultValue: {
      email: user.email,
      name: user.name,
    },
  });

  return (
    <Container title="Basic Information" className="mb-8">
      <fetcher.Form {...getFormProps(form)} method="post" className="space-y-6">
        <input type="hidden" name="intent" value={ACCOUNT_INFORMATION_INTENT} />

        {/* Basic Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={fields.name.id}>Name</Label>
              <Input
                {...getInputProps(fields.name, { type: "text" })}
                defaultValue={user.name}
                className="h-12 border-border bg-background !text-lg"
              />
              <FormError errors={fields.name.errors} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input
                {...getInputProps(fields.email, { type: "email" })}
                defaultValue={user.email}
                className="h-12 border-border bg-background !text-lg"
                readOnly
              />
              <FormError errors={fields.email.errors} />
            </div>
          </div>
        </div>
        <FormError errors={form.errors} />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <Icons.loader2 className="ml-2 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </fetcher.Form>
    </Container>
  );
}
