import { Form, Link, useLoaderData } from "react-router"

import { Camera, LogOut, type LucideIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"
import { getImgSrc, getInitials } from "@repo/utils/misc"

import type { TabValue } from ".."
import type { Route } from "../+types/index"

type SideNavProps = {
	tabs: { value: TabValue; Icon: LucideIcon }[]
	activeTab: TabValue
	setActiveTab: (activetab: TabValue) => void
}

export function SideNav({ tabs, activeTab, setActiveTab }: SideNavProps) {
	const loaderData = useLoaderData() as Route.ComponentProps["loaderData"]
	const user = loaderData.user
	return (
		<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
			<div className="border-b border-border p-6 text-center">
				<div className="relative z-20 mx-auto mb-4 size-24 overflow-visible">
					<Button
						size={"icon"}
						className="absolute -top-1 right-0 size-8 rounded-full outline outline-red-500"
						asChild
					>
						<Link to={"/profile/change-photo"}>
							<Camera className="h-full w-full" />
						</Link>
					</Button>
					<Avatar className="-z-20 size-24 border border-border">
						<AvatarImage
							src={getImgSrc({
								seed: user.name,
								fileKey: user.image?.fileKey,
							})}
							alt={user.name}
						/>
						<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
					</Avatar>
				</div>
				<h2 className="text-xl font-bold">{user.name}</h2>
				<p className="text-muted-foreground">{user.email}</p>
				<div className="mt-2 text-sm text-muted-foreground">
					<span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
						{user.isSubscribedToNewsletter ? "Premium Plan" : " Free Plan"}
					</span>
				</div>
			</div>
			<nav className="p-4">
				<ul role="tablist" aria-orientation="vertical" className="space-y-1">
					{tabs.map((tab, i) => (
						<TabItem
							key={`${tab.value}-${i}`}
							value={tab.value}
							Icon={tab.Icon}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					))}
				</ul>
			</nav>
			<Form
				method="post"
				action="/signout"
				className="border-t border-border p-4"
			>
				<Button variant="destructive" className="w-full font-bold">
					<LogOut className="mr-3 h-5 w-5" />
					Sign Out
				</Button>
			</Form>
		</div>
	)
}

interface TabItemProps {
	value: TabValue
	Icon: LucideIcon
	activeTab: TabValue
	setActiveTab: (activeTab: TabValue) => void
}

function TabItem({ value, Icon, activeTab, setActiveTab }: TabItemProps) {
	const isActive = activeTab === value

	return (
		<li role="presentation">
			<button
				role="tab"
				aria-selected={isActive}
				aria-label={value}
				tabIndex={isActive ? 0 : -1}
				onClick={() => setActiveTab(value)}
				className={cn(
					"flex w-full items-center rounded-lg px-4 py-2 text-foreground capitalize hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
					{
						"bg-muted text-blue-600 dark:text-blue-400": isActive,
					},
				)}
			>
				<Icon className="mr-3 h-5 w-5" aria-hidden="true" />
				{value}
			</button>
		</li>
	)
}
