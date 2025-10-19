import { isDevelopment } from "@/constants/client";
import { allowedDomains, devPorts, serviceUrls } from "@/constants/config";

/**
 * Check if a URL is allowed for redirect
 */
export function isAllowedRedirect(url: string): boolean {
  try {
    const parsed = new URL(url);
    return allowedDomains.some((domain) => {
      if (domain === "localhost") {
        return parsed.hostname === "localhost";
      }
      return (
        parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
      );
    });
  } catch {
    return !url.startsWith("http://") || !url.startsWith("https://");
  }
}

/**
 * Get the base URL for a service
 */
export function getServiceUrl(
  service: keyof typeof devPorts,
  overrideServiceUrls: typeof serviceUrls = serviceUrls,
  overrideIsDevelopment: boolean = isDevelopment,
): string {
  if (overrideIsDevelopment) {
    const port = devPorts[service];
    return `http://localhost:${port}`;
  }
  return overrideServiceUrls[service];
}

/**
 * Build a URL for a specific service
 */
export function buildServiceUrl(
  service: keyof typeof devPorts,
  path: string = "",
): string {
  const baseUrl = getServiceUrl(service);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}
