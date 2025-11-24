import { styleText } from "node:util"

import { remember } from "@epic-web/remember"
import { PrismaLibSql } from "@prisma/adapter-libsql"

import { PrismaClient } from "./generated/prisma/client"

const { NODE_ENV, DATABASE_URL, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } =
	process.env

if (!DATABASE_URL || !TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
	throw new Error("DATABASE_URL, AUTH_TOKEN, or TURSO_AUTH_TOKEN not set.")
}

const isDev = NODE_ENV !== "production"

export const databaseConfig = isDev
	? { url: DATABASE_URL }
	: { url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN }

export const prisma = remember("prisma", () => {
	const adapter = new PrismaLibSql(databaseConfig)

	const LOG_THRESHOLD = 20

	const client = new PrismaClient({
		adapter,
		log: [
			{ level: "query", emit: "event" },
			{ level: "error", emit: "stdout" },
			{ level: "warn", emit: "stdout" },
		],
	})

	client.$on("query", (e) => {
		if (e.duration < LOG_THRESHOLD) return
		const color =
			e.duration < 50 ? "green" : e.duration < 100 ? "yellow" : "red"
		// biome-ignore lint/suspicious/noConsole: For query analysis
		console.info(
			`prisma:query - ${styleText(color, `${e.duration}ms`)} - ${e.query}`,
		)
	})
	void client.$connect()
	return client
})
