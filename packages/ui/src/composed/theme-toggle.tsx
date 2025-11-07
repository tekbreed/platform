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
		<DropdownMenu open={dropDown} onOpenChange={setDropDown}>
			<DropdownMenuTrigger asChild>
				{isNavigating ? (
					<Button
						variant="outline"
						size="icon"
						className="relative rounded-full"
						arial-disabled={true}
					>
						<Icons.loader className="animate-spin" />
					</Button>
				) : (
					<Button
						variant="outline"
						size="icon"
						className="relative rounded-full"
					>
						{/* System Theme Icon */}
						<Icons.monitor
							className={cn(
								"absolute h-[1.2rem] w-[1.2rem] transition-all",
								definedBy === "SYSTEM"
									? "scale-100 rotate-0"
									: "scale-0 rotate-90",
							)}
							aria-hidden="true"
						/>
						{/* Light Theme Icon */}
						<Icons.sun
							className={cn(
								"absolute h-[1.2rem] w-[1.2rem] transition-all",
								isLightTheme ? "scale-100 rotate-0" : "scale-0 -rotate-90",
							)}
							aria-hidden="true"
						/>
						{/* Dark Theme Icon */}
						<Icons.moon
							className={cn(
								"absolute h-[1.2rem] w-[1.2rem] transition-all",
								isDarkTheme ? "scale-100 rotate-0" : "scale-0 rotate-90",
							)}
							aria-hidden="true"
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
