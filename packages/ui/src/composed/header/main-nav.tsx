"use client"

import { learning, platform, services } from "@repo/utils/constants/client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import { Icons } from "@/composed/icons"
import { Logo } from "@/composed/logo"
import { SmartLink } from "../smart-link"

export function MainNav() {
	return (
		<div className="flex gap-6">
			<Logo />
			<nav className="hidden items-center space-x-6 font-medium text-sm md:flex">
				<div className="hidden items-center gap-6 lg:flex">
					<DropdownMenu>
						<DropdownMenuTrigger className="hidden items-center gap-1 px-2 py-1 font-semibold focus:border-none lg:flex">
							Learning
							<Icons.chevronDown className="size-4" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-48">
							{learning.map((link) => {
								const Icon = link.icon
								return (
									<DropdownMenuItem asChild key={link.name}>
										<SmartLink
											className="flex items-center gap-2 font-bold capitalize"
											to={link.path}
										>
											{Icon ? <Icon aria-hidden className="size-4" /> : null}
											{link.name}
										</SmartLink>
									</DropdownMenuItem>
								)
							})}
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger className="hidden items-center gap-1 px-2 py-1 font-semibold focus:border-none lg:flex">
							Services
							<Icons.chevronDown className="size-4" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-48">
							{services.map((link) => {
								const Icon = link.icon
								return (
									<DropdownMenuItem asChild key={link.name}>
										<SmartLink
											className="flex items-center gap-2 font-bold capitalize"
											to={link.path}
										>
											{Icon ? <Icon aria-hidden className="size-4" /> : null}
											{link.name}
										</SmartLink>
									</DropdownMenuItem>
								)
							})}
						</DropdownMenuContent>
					</DropdownMenu>
					{platform.map((link) => (
						<SmartLink
							className="font-semibold capitalize"
							key={link.name}
							to={link.path}
						>
							{link.name}
						</SmartLink>
					))}
				</div>
			</nav>
		</div>
	)
}
