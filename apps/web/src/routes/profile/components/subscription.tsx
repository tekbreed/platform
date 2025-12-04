import type React from "react"

import { Link, useLoaderData, useNavigate } from "react-router"

import { format } from "date-fns"
import { motion } from "framer-motion"

import { Button } from "@repo/ui/components/button"
import { EmptyState } from "@repo/ui/composed/empty-state"
import { Icons } from "@repo/ui/composed/icons"
import { cn } from "@repo/ui/lib/utils"

import type { Route } from "../+types/index"

// types.ts
export type SubscriptionStatus =
	| "active"
	| "canceled"
	| "incomplete"
	| "incomplete_expired"
	| "past_due"
	| "unpaid"
	| "trialing"

export interface SubscriptionProduct {
	name: string
}

export interface SubscriptionData {
	product: SubscriptionProduct
	amount: number
	recurringInterval: string
	status: SubscriptionStatus
	currentPeriodStart: Date
	currentPeriodEnd?: Date | null
	endedAt?: Date | null
	cancelAtPeriodEnd: boolean
}

export interface SubscriptionProps {
	subscription: SubscriptionData | null
}

export const ENDED_STATUSES: SubscriptionStatus[] = [
	"canceled",
	"past_due",
	"unpaid",
]

export function getStatusConfig(status: SubscriptionStatus) {
	const configs = {
		active: {
			className:
				"bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
			label: "Active",
		},
		canceled: {
			className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
			label: "Canceled",
		},
		incomplete: {
			className:
				"bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
			label: "Incomplete",
		},
		incomplete_expired: {
			className: "bg-muted text-muted-foreground",
			label: "Expired",
		},
		past_due: {
			className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
			label: "Past Due",
		},
		unpaid: {
			className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
			label: "Unpaid",
		},
		trialing: {
			className:
				"bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
			label: "Trial",
		},
	}

	return (
		configs[status] || {
			className: "bg-muted text-muted-foreground",
			label: status,
		}
	)
}

export function shouldShowEndDate(status: SubscriptionStatus): boolean {
	return ENDED_STATUSES.includes(status)
}

export function shouldShowNextBilling(
	status: SubscriptionStatus,
	currentPeriodEnd: Date | null | undefined,
	cancelAtPeriodEnd: boolean,
): boolean {
	return !!(currentPeriodEnd && !cancelAtPeriodEnd && status === "active")
}

export function shouldShowCancellationDate(
	cancelAtPeriodEnd: boolean,
	currentPeriodEnd: Date | null | undefined,
): boolean {
	return !!(cancelAtPeriodEnd && currentPeriodEnd)
}

interface SubscriptionCardProps {
	title: string
	children: React.ReactNode
}

export function Subscription() {
	const { subscription } = useLoaderData<Route.ComponentProps["loaderData"]>()
	const navigate = useNavigate()

	const handleSubscribeClick = () => {
		navigate("/subscription")
	}

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.3 }}
		>
			<SubscriptionCard title="Subscription Details">
				{!subscription ? (
					<SubscriptionEmptyState onSubscribeClick={handleSubscribeClick} />
				) : (
					<ActiveSubscriptionContent subscription={subscription} />
				)}
			</SubscriptionCard>
		</motion.div>
	)
}

export function SubscriptionCard({ title, children }: SubscriptionCardProps) {
	return (
		<div className="mb-8 rounded-xl border border-border bg-card shadow-sm">
			<div className="border-border border-b p-6">
				<h2 className="font-bold text-xl">{title}</h2>
			</div>
			<div className="p-6">{children}</div>
		</div>
	)
}

interface SubscriptionEmptyStateProps {
	onSubscribeClick: () => void
}

export function SubscriptionEmptyState({
	onSubscribeClick,
}: SubscriptionEmptyStateProps) {
	return (
		<EmptyState
			action={{
				label: "Subscribe Now",
				onClick: onSubscribeClick,
			}}
			description="You don't have an active subscription."
			icon={<Icons.creditCard className="size-8" />}
			title="No Subscription Found!"
		/>
	)
}

interface SubscriptionPlanHeaderProps {
	subscription: SubscriptionData
}

export function SubscriptionPlanHeader({
	subscription,
}: SubscriptionPlanHeaderProps) {
	const statusConfig = getStatusConfig(subscription.status)

	return (
		<div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
			<div className="flex items-center justify-between">
				<SubscriptionPlanInfo subscription={subscription} />
				<SubscriptionStatusBadge statusConfig={statusConfig} />
			</div>
		</div>
	)
}

function SubscriptionPlanInfo({
	subscription,
}: {
	subscription: SubscriptionData
}) {
	return (
		<div>
			<div className="font-bold text-blue-600 text-lg dark:text-blue-400">
				{subscription.product.name} Plan
			</div>
			<div className="text-muted-foreground">
				${subscription.amount / 100} / {subscription.recurringInterval}
			</div>
		</div>
	)
}

function SubscriptionStatusBadge({
	statusConfig,
}: {
	statusConfig: { className: string; label: string }
}) {
	return (
		<div
			className={cn(
				"rounded-full px-3 py-1 font-medium text-sm capitalize",
				statusConfig.className,
			)}
		>
			{statusConfig.label}
		</div>
	)
}

interface SubscriptionDetailsProps {
	subscription: SubscriptionData
}

export function SubscriptionDetails({
	subscription,
}: SubscriptionDetailsProps) {
	return (
		<div className="space-y-4">
			<SubscriptionDetailRow
				label="Started on"
				value={format(subscription.currentPeriodStart, "MMM d, yyyy")}
			/>

			{shouldShowNextBilling(
				subscription.status,
				subscription.currentPeriodEnd,
				subscription.cancelAtPeriodEnd,
			) &&
				subscription.currentPeriodEnd && (
					<SubscriptionDetailRow
						label="Next billing date"
						value={format(subscription.currentPeriodEnd, "MMM d, yyyy")}
					/>
				)}

			{shouldShowEndDate(subscription.status) && subscription.endedAt && (
				<SubscriptionDetailRow
					label="Ended on"
					value={format(subscription.endedAt, "MMM d, yyyy")}
				/>
			)}

			{shouldShowCancellationDate(
				subscription.cancelAtPeriodEnd,
				subscription.currentPeriodEnd,
			) ? (
				<SubscriptionDetailRow
					label="Subscription will be canceled on"
					value={
						subscription.currentPeriodEnd
							? format(subscription.currentPeriodEnd, "MMM d, yyyy")
							: "N/A"
					}
				/>
			) : null}
		</div>
	)
}

function SubscriptionDetailRow({
	label,
	value,
}: {
	label: string
	value: string
}) {
	return (
		<div className="flex items-center justify-between border-border border-b pb-4">
			<div className="font-medium">{label}</div>
			<div>{value}</div>
		</div>
	)
}

export function BillingHistorySection() {
	return (
		<div className="flex items-center justify-between border-border border-b pb-4">
			<div className="font-medium">Billing history</div>
			<Link target="_blank" to="/subscription/portal">
				<Button className="h-auto p-0" variant="link">
					View all
					<Icons.chevronRight className="ml-1 h-4 w-4" />
				</Button>
			</Link>
		</div>
	)
}

export function SubscriptionActions() {
	return (
		<div className="flex justify-end gap-6">
			<ManageSubscriptionButton />
			<CancelSubscriptionButton />
		</div>
	)
}

function ManageSubscriptionButton() {
	return (
		<Link target="_blank" to="/subscription/portal">
			<Button variant="outline">Manage Subscription</Button>
		</Link>
	)
}

function CancelSubscriptionButton() {
	return (
		<Link target="_blank" to="/subscription/portal">
			<Button
				className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
				variant="outline"
			>
				Cancel Subscription
			</Button>
		</Link>
	)
}

interface ActiveSubscriptionContentProps {
	subscription: SubscriptionData
}

export function ActiveSubscriptionContent({
	subscription,
}: ActiveSubscriptionContentProps) {
	return (
		<>
			<SubscriptionPlanHeader subscription={subscription} />
			<div className="space-y-4">
				<SubscriptionDetails subscription={subscription} />
				<BillingHistorySection />
				<SubscriptionActions />
			</div>
		</>
	)
}
