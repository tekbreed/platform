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
	}, [searchParams])

	return (
		<header
			className={cn(
				"relative isolate overflow-hidden border-border border-b bg-card py-4",
				className,
			)}
		>
			<BackgroundCanvas />
			<div className="container relative z-10 mx-auto px-4">
				<div className="mx-auto text-center">
					<h1 className="font-bold text-2xl capitalize md:text-3xl">{title}</h1>
					<p className="mb-2 text-lg text-muted-foreground">{description}</p>
					{enableSearch ? (
						<div className="relative mx-auto max-w-2xl">
							<Search
								className="-translate-y-1/2 absolute top-1/2 left-3 transform text-muted-foreground"
								size={20}
							/>
							<Input
								className="rounded-lg border-border bg-background py-6 pl-10 text-base shadow-sm transition-shadow duration-300 hover:shadow-md focus:shadow-md"
								onChange={(e) => {
									const value = e.target.value.trim().toLowerCase()
									setSearch(value)
									handleSearchChange(value)
								}}
								placeholder={placeholder}
								type="search"
								value={search}
							/>
						</div>
					) : null}
				</div>
			</div>
		</header>
	)
}
