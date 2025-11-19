import type { Submission } from "@conform-to/react"
import { z } from "zod/v4"

export const types = ["onboarding", "reset_password", "change_email"] as const
export const VerificationTypeSchema = z.enum(types)
export type VerificationTypes = z.infer<typeof VerificationTypeSchema>

export const codeQueryParam = "code"
export const targetQueryParam = "target"
export const typeQueryParam = "type"
export const redirectToQueryParam = "redirectTo"

export const VerifySchema = z.object({
	[codeQueryParam]: z.string({ error: "OTP is required." }).min(6).max(6),
	[targetQueryParam]: z.string(),
	[typeQueryParam]: VerificationTypeSchema,
	[redirectToQueryParam]: z.string().optional(),
})
export type VerifyFunctionArgs = {
	request: Request
	submission: Submission<z.infer<typeof VerifySchema>>
	body: FormData | URLSearchParams
}
