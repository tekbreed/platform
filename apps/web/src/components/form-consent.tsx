import { Link } from "react-router"

import type { Action } from "./auth-form"

export function FormConsent({ action }: { action: Action }) {
	return (
		<p className="-my-1 text-xs">
			By signing {action === "signup" ? "up" : "in"}, you agree to our{" "}
			<Link
				className="text-blue-700 dark:text-blue-500"
				prefetch="intent"
				to={"/legal/terms-of-use"}
			>
				Terms of Service
			</Link>{" "}
			and{" "}
			<Link
				className="text-blue-700 dark:text-blue-500"
				prefetch="intent"
				to={"/legal/privacy-policy"}
			>
				Privacy Policy
			</Link>
			.
		</p>
	)
}
