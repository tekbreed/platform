import { requireAnonymous } from "@repo/utils/auth.server"
import { checkHoneypot } from "@repo/utils/honeypot.server"

import { AuthForm } from "@/components/auth-form"
import type { Route } from "./+types/index"
import { handleSignIn } from "./action.server"

export async function loader({ request }: Route.LoaderArgs) {
	await requireAnonymous(request)
	return {}
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	await checkHoneypot(formData)
	return handleSignIn(request, formData)
}

export default function SigninRoute({ actionData }: Route.ComponentProps) {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<AuthForm action="signin" actionData={actionData} />
		</div>
	)
}
