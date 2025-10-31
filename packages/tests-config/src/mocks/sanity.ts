import { http, passthrough, type HttpHandler } from "msw";
import { SANITY_API_URL } from "@repo/utils/content/loader";

export const handlers: HttpHandler[] = [
  http.all(`${SANITY_API_URL}*`, async () => {
    return passthrough();
  }),
];
