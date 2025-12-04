import {
	learning,
	legal,
	platform,
	services,
	social,
} from "@repo/utils/constants/client"
import { slogan } from "@repo/utils/constants/config"

import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { SmartLink } from "./smart-link"

export function Footer() {
	return (
		<footer className={cn("border-border border-t py-12")}>
			<div className="container mx-auto px-8">
				<div className="flex flex-col items-start justify-between md:flex-row">
					<section className="mb-6 md:mb-0">
						<Logo />
						<p className="mt-2 text-muted-foreground">{slogan}</p>
					</section>

					<section className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12 lg:grid-cols-5">
						<div>
							<h3 className="mb-3 font-medium text-foreground">Learning</h3>
							<ul className="space-y-2">
								{learning.map((item) => (
									<li key={item.name}>
										<SmartLink
											className="text-muted-foreground text-sm capitalize"
											to={item.path}
										>
											{item.name}
										</SmartLink>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="mb-3 font-medium text-foreground">Services</h3>
							<ul className="space-y-2">
								{services.map((item) => (
									<li key={item.name}>
										<SmartLink
											className="text-muted-foreground text-sm capitalize"
											to={item.path}
										>
											{item.name}
										</SmartLink>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="mb-3 font-medium text-foreground">Platform</h3>
							<ul className="space-y-2">
								{platform.map((item) => (
									<li key={item.name}>
										<SmartLink
											className="text-muted-foreground text-sm capitalize"
											to={item.path}
										>
											{item.name}
										</SmartLink>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="mb-3 font-medium text-foreground">Legal</h3>
							<ul className="space-y-2">
								{legal.map((item) => (
									<li key={item.name}>
										<SmartLink
											className="text-muted-foreground text-sm capitalize"
											to={item.path}
										>
											{item.name}
										</SmartLink>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="mb-3 font-medium text-foreground">Social</h3>
							<ul className="space-y-2">
								{social.map((item) => (
									<li key={item.name}>
										<SmartLink
											className="text-muted-foreground text-sm capitalize"
											to={item.path}
										>
											{item.name}
										</SmartLink>
									</li>
								))}
							</ul>
						</div>
					</section>
				</div>

				<div className="mt-12 border-border border-t pt-8 text-center text-muted-foreground text-sm">
					© {new Date().getFullYear()} TekBreed. All rights reserved.
				</div>
			</div>
		</footer>
	)
}
