import { createThemeSessionResolver } from "remix-themes";
import { createCookieSessionStorage } from "react-router";

const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__tb_theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    maxAge: 60 * 60 * 24 * 365, // 1 year
    ...(isProduction
      ? {
          domain: ".tekbreed.com",
          secure: true,
        }
      : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
