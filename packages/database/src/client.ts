import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { remember } from "@epic-web/remember";
import { styleText } from "node:util";
import { PrismaClient } from "./generated/prisma/client";

const { NODE_ENV, DATABASE_URL, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } =
  process.env;

const isDev = NODE_ENV !== "production";
const databaseConfig = isDev
  ? { url: DATABASE_URL }
  : { url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN };

const adapter = new PrismaLibSQL(databaseConfig);

export const prisma = remember("prisma", () => {
  const LOG_THRESHOLD = 20;

  const client = new PrismaClient({
    adapter,
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "warn", emit: "stdout" },
    ],
  });

  client.$on("query", (e) => {
    if (e.duration < LOG_THRESHOLD) return;
    const color =
      e.duration < 50 ? "green" : e.duration < 100 ? "yellow" : "red";
    console.info(
      `prisma:query - ${styleText(color, `${e.duration}ms`)} - ${e.query}`,
    );
  });
  void client.$connect();
  return client;
});
