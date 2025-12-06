import { Form, Link, useLoaderData } from "react-router"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Button } from "@repo/ui/components/button"
import { type Icon, Icons } from "@repo/ui/composed/icons"
import { cn } from "@repo/ui/lib/utils"

import { getImgSrc, getInitials } from "@repo/utils/misc"

import type { TabValue } from ".."
import type { Route } from "../+types/index"

type SideNavProps = {
	tabs: { value: TabValue; Icon: Icon }[]
	activeTab: TabValue
	setActiveTab: (activetab: TabValue) => void
}

export function SideNav({ tabs, activeTab, setActiveTab }: SideNavProps) {
	const loaderData = useLoaderData() as Route.ComponentProps["loaderData"]
	const user = loaderData.user
	return (
		<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
			<div className="border-border border-b p-6 text-center">
				<div className="relative z-20 mx-auto mb-4 size-24 overflow-visible">
					<Button
						asChild
						className="-top-1 absolute right-0 size-8 rounded-full outline outline-red-500"
						size={"icon"}
					>
						<Link to={"/profile/change-photo"}>
							<Icons.camera className="h-full w-full" />
						</Link>
					</Button>
					<Avatar className="-z-20 size-24 border border-border">
						<AvatarImage
							alt={user.name}
							src={getImgSrc({
								// seed: user.name,
								// fileKey: user.image?.fileKey,
							})}
						/>
						<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
					</Avatar>
				</div>
				<h2 className="font-bold text-xl">{user.name}</h2>
				<p className="text-muted-foreground">{user.email}</p>
				<div className="mt-2 text-muted-foreground text-sm">
					<span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
						{user.isSubscribedToNewsletter ? "Premium Plan" : " Free Plan"}
					</span>
				</div>
			</div>
			<nav className="p-4">
				<ul className="space-y-1">
					{tabs.map((tab, i) => (
						<TabItem
							Icon={tab.Icon}
							activeTab={activeTab}
							key={`${tab.value}-${i}`}
							setActiveTab={setActiveTab}
							value={tab.value}
						/>
					))}
				</ul>
			</nav>
			<Form
				action="/signout"
				className="border-border border-t p-4"
				method="post"
			>
				<Button className="w-full font-bold" variant="destructive">
					<Icons.logOut className="mr-3 h-5 w-5" />
					Sign Out
				</Button>
			</Form>
		</div>
	)
}

interface TabItemProps {
	value: TabValue
	Icon: Icon
	activeTab: TabValue
	setActiveTab: (activeTab: TabValue) => void
}

function TabItem({
	value,
	Icon,
	activeTab,
	setActiveTab,
	...props
}: TabItemProps) {
	const isActive = activeTab === value

	return (
		<li role="presentation">
			<button
				{...props}
				aria-label={value}
				aria-selected={isActive}
				className={cn(
					"flex w-full items-center rounded-lg px-4 py-2 text-foreground capitalize hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
					{
						"bg-muted text-blue-600 dark:text-blue-400": isActive,
					},
				)}
				onClick={() => setActiveTab(value)}
				role="tab"
				tabIndex={isActive ? 0 : -1}
			>
				<Icon aria-hidden="true" className="mr-3 h-5 w-5" />
				{value}
			</button>
		</li>
	)
}
