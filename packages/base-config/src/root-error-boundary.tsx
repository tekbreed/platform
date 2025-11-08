import { GeneralErrorBoundary } from "@repo/ui/composed/error-boundary"

import { useNonce } from "@repo/utils/providers/nonce"

import { Document } from "./document"
import { ThemedApp } from "./themed-app"

export function RootErrorBoundary() {
	const nonce = useNonce()
	return (
		<ThemedApp theme={null}>
			<Document nonce={nonce}>
				<GeneralErrorBoundary />
			</Document>
		</ThemedApp>
	)
}
