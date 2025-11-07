import { motion } from "framer-motion"

import { AccountInformation } from "./account-information"
import { DataAndSecurity } from "./data-and-security"

export function Account() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<AccountInformation />
			<DataAndSecurity />
		</motion.div>
	)
}
