import { Link } from "react-router"

import type { Action } from "./auth-form"

export function FormConsent({ action }: { action: Action }) {
	return (
		<p className="-my-1 text-xs">
			By signing {action === "signup" ? "up" : "in"}, you agree to our{" "}
			<Link
				to={"/legal/terms-of-use"}
				prefetch="intent"
				className="text-blue-700 dark:text-blue-500"
			>
				Terms of Service
			</Link>{" "}
			and{" "}
			<Link
				to={"/legal/privacy-policy"}
				prefetch="intent"
				className="text-blue-700 dark:text-blue-500"
			>
				Privacy Policy
			</Link>
			.
		</p>
	)
}
