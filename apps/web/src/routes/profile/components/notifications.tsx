import type React from "react"

import { useActionData, useFetcher, useLoaderData } from "react-router"

import { getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { motion } from "framer-motion"
import { z } from "zod/v4"

import { cn } from "@repo/ui/lib/utils"

import type { Route } from "../+types/index"
import { Container } from "./container"

export const UPDATE_NOTIFICATIONS_INTENT = "update-notifications"

const stringToBoolean = z.union([z.string(), z.boolean()]).transform((val) => {
	if (typeof val === "boolean") return val
	return val.toLowerCase() === "true"
})

export const NotificationSettingsSchema = z.object({
	userId: z.string(),
	contentUpdate: stringToBoolean,
	promotions: stringToBoolean,
	communityEvents: stringToBoolean,
	allNotifications: stringToBoolean,
})

export function Notifications() {
	const fetcher = useFetcher()
	const actionData = useActionData() as Route.ComponentProps["actionData"]
	const loaderData = useLoaderData() as Route.ComponentProps["loaderData"]
	const notifications = loaderData.user.notificationSettings
	const turnAllOn = notifications?.allNotifications

	function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
		fetcher.submit(
			{
				...notifications,
				[e.currentTarget.name]: e.currentTarget.checked,
				userId: loaderData.user.id,
				intent: UPDATE_NOTIFICATIONS_INTENT,
			},
			{ method: "post" },
		)
	}

	const [, fields] = useForm({
		id: "notifications",
		lastResult: actionData,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: NotificationSettingsSchema })
		},
		shouldValidate: "onBlur",
	})

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.3 }}
		>
			<Container title="Notifications">
				<div className="space-y-6">
					<Toggle
						{...getInputProps(fields.allNotifications, { type: "checkbox" })}
						defaultChecked={turnAllOn}
						description="Receive all updates straight to your inbox"
						label="Receive all notifications"
						onChange={handleSubmit}
					/>

					<Toggle
						{...getInputProps(fields.contentUpdate, { type: "checkbox" })}
						checked={notifications?.contentUpdate || turnAllOn}
						description="Get notified about new content and updates"
						label="Content updates"
						onChange={handleSubmit}
					/>

					<Toggle
						{...getInputProps(fields.promotions, { type: "checkbox" })}
						checked={notifications?.promotions || turnAllOn}
						description="Receive promotional offers and discounts"
						label="Promotions"
						onChange={handleSubmit}
					/>

					<Toggle
						{...getInputProps(fields.communityEvents, { type: "checkbox" })}
						checked={notifications?.communityEvents || turnAllOn}
						description="Stay updated with community activities"
						label="Community events"
						onChange={handleSubmit}
					/>
				</div>
			</Container>
		</motion.div>
	)
}

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	description?: string
}

export function Toggle({
	label,
	description,
	className,
	...props
}: ToggleProps) {
	return (
		<div className="flex items-center justify-between border-border border-b pb-4">
			{(label || description) && (
				<div>
					{label && <div className="font-medium">{label}</div>}
					{description && (
						<div className="text-muted-foreground text-sm">{description}</div>
					)}
				</div>
			)}
			<label className="relative inline-flex cursor-pointer items-center">
				<input
					className={cn("peer sr-only", className)}
					type="checkbox"
					{...props}
				/>
				<div className="peer rtl:peer-checked:after:-translate-x-full h-6 w-11 rounded-full bg-muted after:absolute after:start-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary" />
			</label>
		</div>
	)
}
