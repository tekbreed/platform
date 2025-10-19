import { redirect as routerRedirect } from "react-router";
import { isAllowedRedirect } from "./config";
import { allowedDomains } from "@/constants/config";
import { combineHeaders } from "@/misc";
import { StatusCodes } from "http-status-codes";

interface SmartRedirectOptions {
  /**
   * The URL to redirect to
   */
  to: string;

  /**
   * Force external redirect (window.location)
   */
  external?: boolean;

  /**
   * HTTP status code (default: 302)
   */
  status?: number;

  /**
   * Additional headers for the redirect response
   */
  headers?: HeadersInit;

  /**
   * Preserve current URL as redirectTo query param
   */
  preserveRedirectTo?: boolean;

  /**
   * Current request (needed for preserveRedirectTo)
   */
  request?: Request;
}

/**
 * Smart redirect that automatically chooses between React Router redirect
 * and window.location redirect based on whether the destination is internal or external
 */
export function smartRedirect(options: SmartRedirectOptions): Response | never {
  const {
    to,
    external = false,
    status = 302,
    headers: customHeaders = {},
    preserveRedirectTo = false,
    request,
  } = options;

  let finalUrl = to;
  if (preserveRedirectTo && request) {
    finalUrl = appendRedirectTo(to, request.url);
  }

  const isExternal = (): boolean => {
    if (external) return true;
    // Server-side detection
    if (request) {
      try {
        const currentUrl = new URL(request.url);
        const targetUrl = new URL(finalUrl, currentUrl.origin);
        return currentUrl.origin !== targetUrl.origin;
      } catch {
        return (
          finalUrl.startsWith("http://") ||
          finalUrl.startsWith("https://") ||
          finalUrl.startsWith("//")
        );
      }
    }
    return false;
  };

  if (isExternal()) {
    const headers = combineHeaders(request?.headers, customHeaders, {
      Location: finalUrl,
    });

    return new Response(null, {
      status: status || StatusCodes.MOVED_TEMPORARILY,
      headers,
    });
  }

  /**
   * Internal redirect - use React Router
   */
  return routerRedirect(finalUrl, {
    status,
    headers: combineHeaders(request?.headers, customHeaders),
  });
}

/**
 * Helper to append current URL as redirectTo query param
 */
function appendRedirectTo(targetUrl: string, currentUrl: string): string {
  try {
    const target = new URL(targetUrl, currentUrl);
    const current = new URL(currentUrl);

    const redirectTo = `${current.pathname}${current.search}${current.hash}`;

    target.searchParams.set("redirectTo", redirectTo);

    return target.href;
  } catch {
    return targetUrl;
  }
}

/**
 * Convenience function for 301 permanent redirects
 */
export function permanentRedirect(
  to: string,
  options?: Omit<SmartRedirectOptions, "to" | "status">,
): Response | never {
  return smartRedirect({
    ...options,
    to,
    status: StatusCodes.MOVED_TEMPORARILY,
  });
}

/**
 * Convenience function for 302 temporary redirects (default)
 */
export function temporaryRedirect(
  to: string,
  options?: Omit<SmartRedirectOptions, "to" | "status">,
): Response | never {
  return smartRedirect({
    ...options,
    to,
    status: StatusCodes.MOVED_TEMPORARILY,
  });
}

/**
 * Convenience function for 303 See Other redirects (POST -> GET)
 */
export function seeOtherRedirect(
  to: string,
  options?: Omit<SmartRedirectOptions, "to" | "status">,
): Response | never {
  return smartRedirect({ ...options, to, status: StatusCodes.SEE_OTHER });
}

/**
 * Convenience function for cross-service redirects
 */
export function crossServiceRedirect(
  to: string,
  options?: Omit<SmartRedirectOptions, "to" | "external">,
): Response | never {
  return smartRedirect({ ...options, to, external: true });
}

/**
 * Safe redirect that validates the URL before redirecting
 * Uses TekBreed's allowed domains by default
 */
export function safeRedirect(
  to: string | null | undefined,
  fallback: string = "/",
  customAllowedDomains: typeof allowedDomains = allowedDomains,
): Response | never {
  if (!to) {
    return smartRedirect({ to: fallback });
  }

  try {
    // If custom domains provided, use those
    if (customAllowedDomains && customAllowedDomains.length > 0) {
      const url = new URL(to, "https://tekbreed.com");
      const isAllowed = customAllowedDomains.some(
        (domain) =>
          url.hostname === domain || url.hostname.endsWith(`.${domain}`),
      );

      if (!isAllowed) {
        console.warn(`Redirect to ${to} blocked. Redirecting to ${fallback}`);
        return smartRedirect({ to: fallback });
      }
    } else {
      // Use default TekBreed allowed domains
      if (!isAllowedRedirect(to)) {
        console.warn(`Redirect to ${to} blocked. Redirecting to ${fallback}`);
        return smartRedirect({ to: fallback });
      }
    }

    return smartRedirect({ to });
  } catch {
    console.warn(`Invalid redirect URL: ${to}. Redirecting to ${fallback}`);
    return smartRedirect({ to: fallback });
  }
}

/**
 * Get redirectTo from URL search params
 */
export function getRedirectTo(
  request: Request,
  fallback: string = "/",
): string {
  const url = new URL(request.url);
  return url.searchParams.get("redirectTo") || fallback;
}

/**
 * Redirect back to the URL stored in redirectTo param
 */
export function redirectBack(
  request: Request,
  fallback: string = "/",
  overrideAllowedDomains: typeof allowedDomains = allowedDomains,
): Response | never {
  const redirectTo = getRedirectTo(request, fallback);
  return safeRedirect(redirectTo, fallback, overrideAllowedDomains);
}
