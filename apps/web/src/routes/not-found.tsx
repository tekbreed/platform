import { NotFoundUI } from "@repo/ui/composed/not-found-ui"

import { generateMetadata } from "@repo/utils/meta"

export default function NotFoundRoute() {
	return (
		<>
			{generateMetadata({ title: "404 |Not Found" })}
			<NotFoundUI />
		</>
	)
}
