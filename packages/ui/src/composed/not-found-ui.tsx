import { Link, useNavigate } from "react-router"

import { motion } from "framer-motion"

import { Button } from "@/components/button"
import { Icons } from "./icons"

export function NotFoundUI() {
	const navigate = useNavigate()
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
			<div className="w-full max-w-md text-center">
				<div className="relative mx-auto mb-8 h-48 w-48">
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-9xl font-bold text-muted-foreground">404</div>
					</div>

					<div className="absolute inset-0 flex items-center justify-center">
						<div className="relative">
							<Icons.search className="h-24 w-24 text-blue-600 dark:text-blue-500" />
							<motion.div
								className="absolute top-1/2 left-1/2 h-32 w-32 rounded-full border-2 border-blue-600 dark:border-blue-500"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.5] }}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "loop",
								}}
								style={{ x: "-50%", y: "-50%" }}
							/>
						</div>
					</div>
				</div>

				<h1 className="mb-4 text-3xl font-bold md:text-4xl">Page Not Found</h1>
				<p className="mb-8 text-muted-foreground">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>

				<div className="flex flex-col justify-center gap-4 sm:flex-row">
					<Button
						className="flex items-center gap-2"
						onClick={() => navigate(-1)}
					>
						<Icons.arrowLeft className="size-4" />
						Go Back
					</Button>
					<Button variant="outline" className="flex items-center gap-2" asChild>
						<Link to="/">
							<Icons.home className="size-4" />
							Back to Home
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
