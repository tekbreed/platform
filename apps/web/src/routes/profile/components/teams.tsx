import { motion } from "framer-motion"

import { EmptyState } from "@repo/ui/composed/empty-state"
import { Icons } from "@repo/ui/composed/icons"

import { Container } from "./container"

export function Teams() {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.3 }}
		>
			<Container title="My Teams">
				<EmptyState
					description="We are working to implement this feature."
					icon={<Icons.comingSoon className="size-8" />}
					title="Coming Soon!"
				/>
			</Container>
		</motion.div>
	)
}
