import React from "react"

import { data, Form, Link } from "react-router"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { parseFormData } from "@mjackson/form-data-parser"
import { StatusCodes } from "http-status-codes"
import { z } from "zod/v4"

import type { Route } from "./+types/change-photo"

// import { generateMetadata } from "~/utils/meta";

import { HoneypotInputs } from "remix-utils/honeypot/react"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Button } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { FormError } from "@repo/ui/composed/form-error"
import { Icons } from "@repo/ui/composed/icons"

import { requireUserId } from "@repo/utils/auth.server"
import { checkHoneypot } from "@repo/utils/honeypot.server"
import {
	getImgSrc,
	getInitials,
	invariant,
	useIsPending,
} from "@repo/utils/misc"
import {
	deleteFileFromStorage,
	uploadFIleToStorage,
} from "@repo/utils/storage.server"
import { redirectWithToast } from "@repo/utils/toast.server"

import { prisma } from "@repo/database/client"

const MAX_SIZE = 1024 * 1024 * 3 // 3MB
const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

const DeleteImageSchema = z.object({
	intent: z.literal("delete"),
})

const NewImageSchema = z.object({
	intent: z.literal("submit"),
	photoFile: z
		.instanceof(File)
		.refine(
			(file) => allowedTypes.includes(file.type),
			"Only JPG, PNG, or WEBP images are allowed",
		)
		.refine((file) => file.size > 0, "Image is required")
		.refine(
			(file) => file.size <= MAX_SIZE,
			"Image size must be less than 3MB",
		),
})

const PhotoFormSchema = z.discriminatedUnion("intent", [
	DeleteImageSchema,
	NewImageSchema,
])

export async function loader({ request }: Route.LoaderArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			image: { select: { fileKey: true, altText: true } },
		},
	})
	return { user }
}

export async function action({ request }: Route.ActionArgs) {
	const userId = await requireUserId(request)
	const formData = await parseFormData(request, { maxFileSize: MAX_SIZE })
	await checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: PhotoFormSchema.transform(async (data, ctx) => {
			if (data.intent === "delete") {
				const file = await prisma.image.findFirst({
					where: { userId },
					select: { fileKey: true },
				})
				invariant(file?.fileKey, "File key is required")
				const response = await deleteFileFromStorage({
					fileKey: file.fileKey,
				})
				if (response.status !== "success") {
					ctx.addIssue({
						path: ["photoFile"],
						code: "custom",
						message: response.error as string,
					})
					return z.NEVER
				}
				return { intent: "delete" }
			}
			if (data.photoFile.size <= 0) return z.NEVER
			const { photoFile, intent } = data
			const response = await uploadFIleToStorage({
				file: data.photoFile,
				fileKey: photoFile.name,
			})

			if (response.status !== "success") {
				ctx.addIssue({
					path: ["photoFile"],
					code: "custom",
					message: response.error as string,
				})
				return z.NEVER
			}
			return {
				intent,
				image: {
					fileKey: photoFile.name,
				},
			}
		}),
		async: true,
	})

	if (submission.status !== "success") {
		return data(
			{ ...submission.reply() },
			{
				status:
					submission.status === "error"
						? StatusCodes.BAD_REQUEST
						: StatusCodes.OK,
			},
		)
	}

	const MOCKS = process.env.MOCKS
	const { image, intent } = submission.value

	if (intent === "delete") {
		if (!MOCKS) {
			await prisma.image.deleteMany({ where: { userId } })
		}
		return await redirectWithToast("/profile", {
			title: `Profile picture removed`,
			description: "You have successfully deleted your profile picture",
			type: "success",
		})
	}

	if (!MOCKS) {
		await prisma.$transaction(async ($prisma) => {
			await $prisma.image.deleteMany({ where: { userId } })
			await $prisma.user.update({
				where: { id: userId },
				data: { image: { create: image } },
			})
		})
	}
	return await redirectWithToast("/profile", {
		title: `Profile picture update`,
		description: "You have successfully updated your profile picture",
		type: "success",
	})
}

export default function ChangePhoto({
	actionData,
	loaderData,
}: Route.ComponentProps) {
	// const metadata = generateMetadata({ title: "Change Profile Image" });
	const user = loaderData.user
	const isSubmitting = useIsPending()

	const [form, fields] = useForm({
		id: "change-image",
		lastResult: actionData,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: PhotoFormSchema })
		},
		shouldValidate: "onBlur",
	})
	const [newImageSrc, setNewImageSrc] = React.useState<string | null>(null)

	return (
		<>
			{/* {metadata} */}
			<div className="!h-[90%] flex">
				<Card className="m-auto w-full max-w-md bg-card/80 shadow-xl backdrop-blur-sm">
					<Form
						encType="multipart/form-data"
						method="POST"
						onReset={() => setNewImageSrc(null)}
						{...getFormProps(form)}
						className="mx-auto w-full space-y-6"
					>
						<HoneypotInputs />
						<CardHeader>
							<CardTitle>Update Profile Image</CardTitle>
							<CardDescription>
								Update your profile picture or delete the current one. Supported
								formats: JPG, PNG, WEBP (Max 3MB).
							</CardDescription>
						</CardHeader>
						<CardContent className="my-8">
							<Avatar className="mx-auto my-4 size-48 border border-border">
								<AvatarImage
									alt={user.name}
									src={
										newImageSrc ??
										getImgSrc({
											seed: user.name,
											fileKey: user.image?.fileKey,
										})
									}
								/>
								<AvatarFallback className="text-3xl">
									{getInitials(user.name)}
								</AvatarFallback>
							</Avatar>
							<FormError errors={fields.photoFile.errors} />
							<div className="flex gap-4">
								<input
									{...getInputProps(fields.photoFile, { type: "file" })}
									accept="image/*"
									className="peer sr-only"
									onChange={(e) => {
										const file = e.currentTarget.files?.[0]
										if (file) {
											const reader = new FileReader()
											reader.onload = (event) => {
												setNewImageSrc(event.target?.result?.toString() ?? null)
											}
											reader.readAsDataURL(file)
										}
									}}
									required
									tabIndex={newImageSrc ? -1 : 0}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<div className="flex w-full justify-evenly">
								<Link to={"/profile"}>
									<Button variant={"outline"}>Cancel</Button>
								</Link>
								{newImageSrc ? (
									<Button type="reset" variant="destructive">
										Reset
									</Button>
								) : null}

								{user.image ? (
									<Button
										disabled={isSubmitting}
										name="intent"
										type="submit"
										value="delete"
										variant={"destructive"}
									>
										{isSubmitting ? (
											<Icons.loader className="mr-1 size-4 animate-spin" />
										) : null}{" "}
										Delete
									</Button>
								) : null}
								{newImageSrc ? (
									<Button
										disabled={isSubmitting}
										name="intent"
										type="submit"
										value="submit"
									>
										Save{" "}
										{isSubmitting ? (
											<Icons.loader2 className="ml-2 animate-spin" />
										) : null}
									</Button>
								) : (
									<Button
										asChild
										disabled={isSubmitting}
										name="intent"
										type="submit"
										value="submit"
									>
										<label htmlFor={fields.photoFile.id}>Change </label>
									</Button>
								)}
							</div>
						</CardFooter>
					</Form>
				</Card>
			</div>
		</>
	)
}
