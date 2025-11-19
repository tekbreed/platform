import { z } from "zod/v4"

export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 20

export const PasswordSchema = z
	.string({ error: "Password is required" })
	.min(6, { message: "Password is too short" })
	.refine((val) => new TextEncoder().encode(val).length <= 72, {
		message: "Password is too long",
	})

export const NameSchema = z
	.string({ error: "Name is required" })
	.min(3, { message: "Name is too short" })
	.max(40, { message: "Name is too long" })
	.transform((value) => value.trim().replace(/\s+/g, " "))

export const EmailSchema = z
	.email({ error: "Email is invalid" })
	.min(3, { message: "Email is too short" })
	.max(100, { message: "Email is too long" })
	.transform((value) => value.toLowerCase())

export const PasswordAndConfirmPasswordSchema = z
	.object({ password: PasswordSchema, confirmPassword: PasswordSchema })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				path: ["confirmPassword"],
				code: "custom",
				message: "The passwords must match",
			})
		}
	})

export const RememberMeSchema = z
	.boolean()
	.optional()
	.transform((val) => (val ? "true" : undefined))
