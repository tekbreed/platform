import React from "react"

// import { generateMetadata } from "~/utils/meta";
import { useLoaderData, useSearchParams } from "react-router"

import {
	Award,
	Bell,
	Bookmark,
	BookOpen,
	CreditCard,
	Flag,
	type LucideIcon,
	User,
	Users,
} from "lucide-react"

import { requireUserId } from "@repo/utils//auth/auth.server"

import type { Route } from "../profile/+types"
import { handleActions } from "./action.server"
import { Account } from "./components/account"
import { Bookmarks } from "./components/bookmarks"
import { Certificates } from "./components/certificates"
import { ContentReports } from "./components/content-reports"
import { Courses } from "./components/courses"
import { Notifications } from "./components/notifications"
import { Programs } from "./components/programs"
import { SideNav } from "./components/side-nav"
import { Subscription } from "./components/subscription"
import { Teams } from "./components/teams"
import {
	getBookmarks,
	getReports,
	getSubscription,
	getUserProfle,
} from "./loader.server"

export async function loader({ request }: Route.LoaderArgs) {
	const userId = await requireUserId(request)
	const user = await getUserProfle(userId)
	const subscription = await getSubscription(userId)
	const bookmarks = await getBookmarks(userId)
	const reports = await getReports(userId)
	return { user, subscription, bookmarks, reports }
}

export async function action({ request }: Route.ActionArgs) {
	const userId = await requireUserId(request)
	return await handleActions(request, userId)
}

export type TabValue =
	| "Account"
	| "My Programs"
	| "My Courses"
	| "My Teams"
	| "Certificates"
	| "Subscription"
	| "Notifications"
	| "Bookmarks"
	| "Content Reports"
	| "API Keys"

export default function ProfileRoute() {
	// const metadata = generateMetadata({ title: "Profile" });
	const [searchParams, setSearchParams] = useSearchParams()
	const { bookmarks, reports } =
		useLoaderData<Route.ComponentProps["loaderData"]>()

	const tabs = [
		{ value: "Account", Icon: User },
		{ value: "My Programs", Icon: BookOpen },
		{ value: "My Courses", Icon: BookOpen },
		{ value: "My Teams", Icon: Users },
		{ value: "Certificates", Icon: Award },
		{ value: "Subscription", Icon: CreditCard },
		{ value: "Notifications", Icon: Bell },
		{ value: "Bookmarks", Icon: Bookmark },
		{ value: "Content Reports", Icon: Flag },
		{ value: "API Keys", Icon: Flag },
	] as { value: TabValue; Icon: LucideIcon }[]

	const tabValues = tabs.map((tab) => tab.value)
	const tabFromUrl = searchParams.get("tab") as TabValue

	const [activeTab, setActiveTab] = React.useState<TabValue>(
		tabFromUrl && tabValues.includes(tabFromUrl) ? tabFromUrl : tabValues[0],
	)

	const handleTabChange = React.useCallback(
		(newTab: TabValue) => {
			setSearchParams(
				(prev) => {
					const newParams = new URLSearchParams(prev)
					newParams.set("tab", newTab)
					return newParams
				},
				{ preventScrollReset: true },
			)
			setActiveTab(newTab)
		},
		[setSearchParams],
	)

	function renderTab() {
		switch (activeTab) {
			case "Account":
				return <Account />
			case "My Programs":
				return <Programs />
			case "My Courses":
				return <Courses />
			case "My Teams":
				return <Teams />
			case "Certificates":
				return <Certificates />
			case "Subscription":
				return <Subscription />
			case "Notifications":
				return <Notifications />
			case "Bookmarks":
				return <Bookmarks bookmarks={bookmarks} />
			case "Content Reports":
				return <ContentReports reports={reports} />
			case "API Keys":
				return <ContentReports reports={reports} />
			default:
				return <Account />
		}
	}

	return (
		<>
			{/* {metadata} */}
			<div className="my-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
						<div className="lg:col-span-1">
							<div className="lg:sticky lg:top-20">
								<SideNav
									activeTab={activeTab}
									setActiveTab={handleTabChange}
									tabs={tabs}
								/>
							</div>
						</div>
						<div
							aria-labelledby={`tab-${activeTab}`}
							className="lg:col-span-3"
							id={`tabpanel-${activeTab}`}
							role="tabpanel"
						>
							{renderTab()}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
