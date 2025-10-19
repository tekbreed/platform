import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { PreventFlashOnWrongTheme, type Theme } from "remix-themes";

type DocumentProps = {
  children: React.ReactNode;
  currentTheme?: Theme | null;
  nonce: string;
  theme?: Theme | null;
  env?: Record<string, string | undefined>;
};

export function Document({
  children,
  currentTheme,
  theme,
  env,
  nonce,
}: DocumentProps) {
  const allowIndexing = env?.ALLOW_INDEXING !== "false";
  return (
    <html lang="en" data-theme={currentTheme ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme nonce={nonce} ssrTheme={!!theme} />
        {allowIndexing ? null : (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        <div className="min-h-screen">{children}</div>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
