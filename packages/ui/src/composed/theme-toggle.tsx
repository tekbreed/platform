import React from "react"

import { useNavigation } from "react-router"

import { Theme, useTheme } from "remix-themes"

import { Button } from "@/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import { VisuallyHidden } from "@/components/visually-hidden"
import { cn } from "@/lib/utils"
import { Icons } from "./icons"

export function ThemeToggle() {
	const [dropDown, setDropDown] = React.useState(false)
	const [theme, setTheme, { definedBy }] = useTheme()

	const navigation = useNavigation()

	const isNavigating = navigation.state === "loading"
	const isLightTheme = theme === "light" && definedBy !== "SYSTEM"
	const isDarkTheme = theme === "dark" && definedBy !== "SYSTEM"

	return (
		<DropdownMenu onOpenChange={setDropDown} open={dropDown}>
			<DropdownMenuTrigger asChild disabled={isNavigating}>
				{isNavigating ? (
					<Button
						arial-disabled={true}
						className="relative rounded-full"
						size="icon"
						variant="outline"
					>
						<Icons.loader className="animate-spin" />
					</Button>
				) : (
					<Button
						className="relative rounded-full"
						size="icon"
						variant="outline"
					>
						{/* System Theme Icon */}
						<Icons.monitor
							aria-hidden="true"
							className={cn(
								"absolute h-[1.2rem] w-[1.2rem] transition-all",
								definedBy === "SYSTEM"
									? "rotate-0 scale-100"
									: "rotate-90 scale-0",
							)}
						/>
						{/* Light Theme Icon */}
						<Icons.sun
							aria-hidden="true"
							className={cn(
								"absolute h-[1.2rem] w-[1.2rem] transition-all",
								isLightTheme ? "rotate-0 scale-100" : "-rotate-90 scale-0",
							)}
						/>
						{/* Dark Theme Icon */}
						<Icons.moon
							aria-hidden="true"
							className={cn(
								"absolute h-[1.2rem] w-[1.2rem] transition-all",
								isDarkTheme ? "rotate-0 scale-100" : "rotate-90 scale-0",
							)}
						/>
						<VisuallyHidden>Toogle Theme</VisuallyHidden>
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme(null)}>
					System
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
