import { http, passthrough, type HttpHandler } from "msw";

// Match any YouTube URL (both www and m.youtube.com)
const BASE_URL = /https:\/\/(www|m)\.youtube\.com/;

export const handlers: HttpHandler[] = [
  http.all(BASE_URL, async () => {
    return passthrough();
  }),
];
