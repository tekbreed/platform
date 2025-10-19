import { http, passthrough, type HttpHandler } from "msw";

const DISCORD_BASE_URL = "https://gateway.discord.gg";

export const handlers: HttpHandler[] = [
  http.all(`${DISCORD_BASE_URL}/*`, async () => {
    return passthrough();
  }),
];
