import { useState } from "react"

import type { ErrorResponse } from "react-router"
import {
	isRouteErrorResponse,
	useNavigate,
	useParams,
	useRouteError,
} from "react-router"

import { getModuleUrl } from "@repo/utils/constants/client"
import { getErrorMessage } from "@repo/utils/misc"

import { Button } from "@/components/button"
import { Icons } from "./icons"
import { SmartLink } from "./smart-link"

type StatusHandler = (info: {
	error: ErrorResponse
	params: Record<string, string | undefined>
}) => React.ReactElement | null

export function GeneralErrorBoundary({
	defaultStatusHandler = ({ error }) => (
		<>
			<div className="mx-auto w-full text-3xl font-bold text-destructive">
				{error.status}
			</div>
			<p className="text-muted-foreground">{error.data}</p>
		</>
	),
	statusHandlers,
	unexpectedErrorHandler = (error) => (
		<p className="text-muted-foreground">{getErrorMessage(error)}</p>
	),
}: {
	defaultStatusHandler?: StatusHandler
	statusHandlers?: Record<number, StatusHandler>
	unexpectedErrorHandler?: (error: unknown) => React.ReactElement | null
}) {
	const error = useRouteError()
	const params = useParams()
	const navigate = useNavigate()
	const [showDetails, setShowDetails] = useState(true)

	if (typeof document !== "undefined") {
		console.error(error)
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
			<div className="w-full max-w-2xl">
				<div className="overflow-hidden rounded-2xl border border-destructive/50 bg-card/80 shadow-2xl backdrop-blur-sm">
					{/* Header with gradient */}
					<div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
						<div className="mb-4 flex items-center justify-center">
							<div className="rounded-full bg-background/20 p-4">
								<Icons.alertTriangle className="size-12" />
							</div>
						</div>

						<h1 className="mb-2 text-center text-3xl font-bold">
							Oops! Something went wrong
						</h1>

						<p className="text-center text-lg text-red-100">
							We encountered an unexpected error. Don&apos;t worry, we&apos;re
							here to help!
						</p>
					</div>

					{/* Main content */}
					<div className="p-8">
						<div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
							<div>
								<Button
									onClick={() => navigate(0)}
									className="flex items-center gap-2 border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700"
									size="lg"
								>
									<div>
										<Icons.refreshCw className="size-4" />
									</div>
									Reload Application
								</Button>
							</div>

							<div>
								<SmartLink to={getModuleUrl("web")}>
									<Button
										variant="outline"
										className="flex items-center gap-2 border-2 border-border hover:border-border hover:bg-muted"
										size="lg"
									>
										<Icons.home className="size-4" />
										Go to Homepage
									</Button>
								</SmartLink>
							</div>
						</div>

						{/* Support section */}
						<div className="mb-6 border-t border-border pt-6 text-center">
							<p className="mb-3 text-muted-foreground">
								Need help? We are ready to assist you.
							</p>
							<div>
								<SmartLink
									to={getModuleUrl("web", "support")}
									className="inline-flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
								>
									<Icons.mail className="size-4" />
									Contact Support
								</SmartLink>
							</div>
						</div>

						{/* Error details toggle */}
						<div>
							<button
								onClick={() => setShowDetails(!showDetails)}
								className="flex w-full items-center justify-center gap-2 py-2 text-muted-foreground transition-colors hover:text-foreground"
							>
								<span className="text-sm font-medium">
									{showDetails ? "Hide" : "Show"} Error Details
								</span>
								<div>
									<Icons.chevronDown className="size-4" />
								</div>
							</button>

							{showDetails ? (
								<div className="overflow-hidden">
									<div className="mt-4 rounded-lg border border-border bg-muted p-4">
										{isRouteErrorResponse(error) ? (
											<div className="font-mono text-sm">
												<div className="mb-2 font-semibold text-red-600 dark:text-red-400">
													HTTP {error.status} Error
												</div>
												<div className="text-foreground">
													{(
														statusHandlers?.[error.status] ??
														defaultStatusHandler
													)({
														error,
														params,
													})}
												</div>
											</div>
										) : (
											<div>
												<h3 className="mb-2 text-sm font-semibold text-foreground">
													Technical Details:
												</h3>
												<div className="rounded border bg-muted p-3 font-mono text-sm text-muted-foreground">
													{unexpectedErrorHandler(error)}
												</div>
											</div>
										)}
									</div>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
