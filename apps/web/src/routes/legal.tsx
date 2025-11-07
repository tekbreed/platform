import { StatusCodes } from "http-status-codes"

import { Markdown } from "@repo/ui/composed/markdown"
import { Header } from "@repo/ui/composed/page-header"
import { getPage } from "@repo/utils/content.server/system/utils"
import { invariant, invariantResponse } from "@repo/utils/misc"

import type { Route } from "./+types/legal"

export async function loader({ params }: Route.LoaderArgs) {
	const { pageSlug } = params
	invariant(pageSlug, "Page slug is required")
	const pageContent = await getPage(pageSlug)
	invariantResponse(pageContent, `Page ${pageSlug} not found`, {
		status: StatusCodes.NOT_FOUND,
	})
	return { pageContent }
}

export default function LegalRoute({ loaderData }: Route.ComponentProps) {
	const { pageContent } = loaderData

	return (
		<>
			<Header title={pageContent.title} description={pageContent.description} />
			<section className="mx-auto mt-6 max-w-3xl">
				<Markdown source={pageContent.content} className="pt-0" />
			</section>
		</>
	)
}
