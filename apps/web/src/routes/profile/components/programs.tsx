import { motion } from "framer-motion"

import { EmptyState } from "@repo/ui/composed/empty-state"
import { Icons } from "@repo/ui/composed/icons"

import { Container } from "./container"

export function Programs() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Container title="My Programs">
				<EmptyState
					icon={<Icons.comingSoon className="size-8" />}
					title="Coming Soon!"
					description="We are working to implement this feature."
				/>
			</Container>
		</motion.div>
	)
}
