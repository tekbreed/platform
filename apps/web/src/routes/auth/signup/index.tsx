import type { Route } from "./+types/index";
import { checkHoneypot } from "@repo/utils/honeypot.server";
import { requireAnonymous } from "@/utils/auth.server";
import { AuthForm } from "@/components/auth-form";
import { handleSignUp } from "./action.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  await checkHoneypot(formData);
  return await handleSignUp(request, formData);
}

export default function SignupRoute({ actionData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthForm action="signup" actionData={actionData} />
    </div>
  );
}
