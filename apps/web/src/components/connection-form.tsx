import { Form } from "react-router"

import { Button } from "@repo/ui/components/button"
import { Icons } from "@repo/ui/composed/icons"

import {
	GITHUB_PROVIDER_NAME,
	type ProviderName,
} from "@repo/utils/auth/connection"
import { useIsPending } from "@repo/utils/misc"

import type { Action } from "./auth-form"

export const providerLabels: Record<ProviderName, string> = {
	[GITHUB_PROVIDER_NAME]: "GitHub",
} as const

export const providerIcons: Record<ProviderName, React.ReactNode> = {
	[GITHUB_PROVIDER_NAME]: <>Github</>,
} as const

export const icons = {
	[GITHUB_PROVIDER_NAME]: <Icons.github />,
}

export function ConnectionForm({
	redirectTo,
	action,
	providerName,
}: {
	redirectTo?: string | null
	action: Action | "connect"
	providerName: ProviderName
}) {
	const label = providerLabels[providerName]
	const formAction = `/auth/${providerName}`
	const isPending = useIsPending({ formAction })
	return (
		<Form
			action={formAction}
			className="flex items-center justify-center gap-2"
			method="POST"
		>
			{redirectTo ? (
				<input name="redirectTo" type="hidden" value={redirectTo} />
			) : null}
			<Button
				className="w-full"
				disabled={isPending}
				type="submit"
				variant="secondary"
			>
				<span className="inline-flex items-center gap-1.5">
					{icons[providerName]}
					<span className="capitalize">{action}</span> with <span>{label}</span>{" "}
					{isPending ? <Icons.loader2 className="ml-2 animate-spin" /> : null}
				</span>
			</Button>
		</Form>
	)
}
