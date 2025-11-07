import fs from "node:fs/promises"
import path from "node:path"

import { faker } from "@faker-js/faker"
import { type HttpHandler, HttpResponse, http } from "msw"

// File-based storage path - stores files in a temp directory
const STORAGE_DIR = path.join(process.cwd(), ".msw-bunny-storage")
const STORAGE_URL = /^https:\/\/storage\.bunnycdn\.com\/.*$/

// Ensure storage directory exists
async function ensureStorageDir() {
	try {
		await fs.access(STORAGE_DIR)
	} catch {
		await fs.mkdir(STORAGE_DIR, { recursive: true })
	}
}

// Helper to get file path from filename
function getFilePath(filename: string): string {
	return path.join(STORAGE_DIR, filename)
}

// Helper to store metadata about uploaded files
async function saveMetadata(filename: string, url: string) {
	const metadataPath = path.join(STORAGE_DIR, `${filename}.meta.json`)
	await fs.writeFile(
		metadataPath,
		JSON.stringify({ filename, url, uploadedAt: new Date().toISOString() }),
	)
}

// Helper to get metadata
async function getMetadata(filename: string): Promise<{ url: string } | null> {
	try {
		const metadataPath = path.join(STORAGE_DIR, `${filename}.meta.json`)
		const data = await fs.readFile(metadataPath, "utf-8")
		return JSON.parse(data)
	} catch {
		return null
	}
}

export const handlers: HttpHandler[] = [
	// Mock file upload
	http.put(STORAGE_URL, async ({ request }) => {
		await ensureStorageDir()

		const body = await request.arrayBuffer()

		// Generate a fake filename and URL
		const filename = faker.system.fileName()
		const imageUrl = `https://storage.bunnycdn.com/mock/${filename}`
		const filePath = getFilePath(filename)

		// Write the file to disk
		await fs.writeFile(filePath, Buffer.from(body))

		// Save metadata
		await saveMetadata(filename, imageUrl)

		console.log(
			`Mocked file upload to Bunny - received ${body.byteLength} bytes, stored as ${filename} at ${filePath}, and returned ${imageUrl}`,
		)

		return HttpResponse.json({ ok: true, url: imageUrl })
	}),

	// Mock file delete
	http.delete(STORAGE_URL, async ({ request }) => {
		await ensureStorageDir()

		// Extract the filename from the URL
		const urlParts = request.url.split("/")
		const filename = urlParts[urlParts.length - 1]
		const filePath = getFilePath(filename)
		const metadataPath = path.join(STORAGE_DIR, `${filename}.meta.json`)

		let existed = false

		try {
			// Delete the actual file
			await fs.unlink(filePath)
			existed = true

			// Delete metadata file if it exists
			try {
				await fs.unlink(metadataPath)
			} catch {
				// Metadata might not exist, that's okay
			}

			console.log(
				`Mocked file delete from Bunny, filename: ${filename}, deleted from ${filePath}`,
			)
		} catch (error) {
			console.log(
				`Mocked file delete from Bunny, filename: ${filename}, file not found at ${filePath}`,
			)
		}

		return HttpResponse.json({ ok: true, url: request.url, existed })
	}),

	// Optional: Mock file retrieval/download
	http.get(STORAGE_URL, async ({ request }) => {
		await ensureStorageDir()

		// Extract the filename from the URL
		const urlParts = request.url.split("/")
		const filename = urlParts[urlParts.length - 1]
		const filePath = getFilePath(filename)

		try {
			// Read the file from disk
			const fileBuffer = await fs.readFile(filePath)

			console.log(
				`Mocked file retrieval from Bunny, filename: ${filename}, size: ${fileBuffer.byteLength} bytes`,
			)

			// Return the file with appropriate headers
			return new HttpResponse(fileBuffer, {
				status: 200,
				headers: {
					"Content-Type": "application/octet-stream",
					"Content-Length": fileBuffer.byteLength.toString(),
				},
			})
		} catch (error) {
			console.log(
				`Mocked file retrieval from Bunny, filename: ${filename}, file not found`,
			)

			return new HttpResponse(null, {
				status: 404,
				statusText: "File not found",
			})
		}
	}),
]
