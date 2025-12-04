import { createRoutesStub } from "react-router"

import { describe, expect, it } from "vitest"
import { render } from "vitest-browser-react"

import { SubscriptionForm } from "../suscription-form"

describe("SubscriptionForm", () => {
	it("renders the subscription form", async () => {
		const Stub = createRoutesStub([
			{
				path: "/",
				HydrateFallback: () => <div>Loading...</div>,
				Component: SubscriptionForm,
				loader() {
					return { user: null }
				},
			},
		])

		const screen = render(<Stub initialEntries={["/"]} />)

		await expect
			.element(
				screen.getByRole("heading", {
					name: /be the first to experience the future of learning/i,
				}),
			)
			.toBeInTheDocument()

		await expect
			.element(screen.getByPlaceholder(/your name \(optional\)/i))
			.toBeInTheDocument()

		await expect
			.element(screen.getByPlaceholder(/enter your email/i))
			.toBeInTheDocument()

		await expect
			.element(screen.getByRole("button", { name: /join waitlist/i }))
			.toBeInTheDocument()
	})
})
