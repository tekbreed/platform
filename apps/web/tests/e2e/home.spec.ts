import { test, expect } from "@playwright/test"

test.describe("Home Page", () => {
	test("should load the home page successfully", async ({ page }) => {
		await page.goto("/")
		
		await page.waitForLoadState("networkidle")
		
		await expect(page).toHaveURL("/")
		
		await expect(page).toHaveTitle(/.+/)
	})

	test("should display main navigation", async ({ page }) => {
		await page.goto("/")
		
		const navigation = page.locator("header")
		await expect(navigation).toBeVisible()
	})
	// test("should navigate to articles page", async ({ page }) => {
	// 	await page.goto("/")
		
	// 	// Find and click the articles link
	// 	const articlesLink = page.getByRole("link", { name: /articles/i })
		
	// 	if (await articlesLink.count() > 0) {
	// 		await articlesLink.first().click()
			
	// 		// Wait for navigation
	// 		await page.waitForURL(/\/articles/)
			
	// 		// Verify we're on the articles page
	// 		expect(page.url()).toContain("/articles")
	// 	}
	// })

	// test("should navigate to about page", async ({ page }) => {
	// 	await page.goto("/")
		
	// 	// Find and click the about link
	// 	const aboutLink = page.getByRole("link", { name: /about/i })
		
	// 	if (await aboutLink.count() > 0) {
	// 		await aboutLink.first().click()
			
	// 		// Wait for navigation
	// 		await page.waitForURL(/\/about/)
			
	// 		// Verify we're on the about page
	// 		expect(page.url()).toContain("/about")
	// 	}
	// })

	test("should have responsive layout", async ({ page }) => {
		// Test desktop view
		await page.setViewportSize({ width: 1920, height: 1080 })
		await page.goto("/")
		await expect(page.locator("body")).toBeVisible()
		
		// Test tablet view
		await page.setViewportSize({ width: 768, height: 1024 })
		await page.goto("/")
		await expect(page.locator("body")).toBeVisible()
		
		// Test mobile view
		await page.setViewportSize({ width: 375, height: 667 })
		await page.goto("/")
		await expect(page.locator("body")).toBeVisible()
	})
})
