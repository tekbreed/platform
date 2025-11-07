import React from "react"

import { useSearchParams } from "react-router"

import { Search } from "lucide-react"

import { useDebounce } from "@repo/utils/misc"

import { Input } from "@/components/input"
import { cn } from "@/lib/utils"
import { BackgroundCanvas } from "./background-canvas"

type HeaderProps = {
	title?: string
	description?: string
	placeholder?: string
	enableSearch?: boolean
	className?: string
}

export function Header({
	title,
	description,
	placeholder,
	enableSearch = false,
	className,
}: HeaderProps) {
	const SEARCH = "search"
	const DB_DELAY = 300

	const [search, setSearch] = React.useState("")
	const [searchParams, setSearchParams] = useSearchParams()

	const handleSearchChange = useDebounce((value: string) => {
		setSearchParams(
			(prevParams) => {
				const params = new URLSearchParams(prevParams)
				params.delete(SEARCH)
				if (value) {
					params.set(SEARCH, value)
				} else {
					params.delete(SEARCH)
				}
				return params
			},
			{ preventScrollReset: true },
		)
	}, DB_DELAY)

	React.useEffect(() => {
		setSearch(searchParams.get(SEARCH) ?? "")
	}, [searchParams, setSearch])

	return (
		<header
			className={cn(
				"relative isolate overflow-hidden border-b border-border bg-card py-4",
				className,
			)}
		>
			<BackgroundCanvas />
			<div className="relative z-10 container mx-auto px-4">
				<div className="mx-auto text-center">
					<h1 className="text-2xl font-bold capitalize md:text-3xl">{title}</h1>
					<p className="mb-2 text-lg text-muted-foreground">{description}</p>
					{enableSearch ? (
						<div className="relative mx-auto max-w-2xl">
							<Search
								className="absolute top-1/2 left-3 -translate-y-1/2 transform text-muted-foreground"
								size={20}
							/>
							<Input
								type="search"
								value={search}
								placeholder={placeholder}
								onChange={(e) => {
									const value = e.target.value.trim().toLowerCase()
									setSearch(value)
									handleSearchChange(value)
								}}
								className="rounded-lg border-border bg-background py-6 pl-10 text-base shadow-sm transition-shadow duration-300 hover:shadow-md focus:shadow-md"
							/>
						</div>
					) : null}
				</div>
			</div>
		</header>
	)
}
