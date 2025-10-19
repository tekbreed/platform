import { Link } from "react-router";
import { type ComponentProps } from "react";

interface SmartLinkProps extends Omit<ComponentProps<"a">, "href"> {
  to: string;
  external?: boolean;
}

/**
 * Smart link that automatically chooses between React Router Link and anchor tag
 * based on whether the destination is internal or external
 */
export function SmartLink({
  to,
  external,
  children,
  ...props
}: SmartLinkProps) {
  // Check if link is external (different origin)
  const isExternal =
    external ||
    to.startsWith("http://") ||
    to.startsWith("https://") ||
    to.startsWith("//");

  /**
   * Check if link is to a different localhost port (cross-service in dev)
   * Only check this on the client side to avoid hydration mismatches
   */
  const isDifferentPort =
    typeof window !== "undefined" &&
    to.includes("localhost:") &&
    !to.includes(window.location.port);

  /**
   *  Use regular anchor for external links or cross-service navigation
   */
  if (isExternal || isDifferentPort) {
    return (
      <a href={to} rel="prefetch" {...props}>
        {children}
      </a>
    );
  }

  /**
   * Use React Router Link for internal navigation
   * Use prefetch="intent" to prefetch on hover/focus for better UX
   */
  return (
    <Link prefetch="intent" to={to} {...props}>
      {children}
    </Link>
  );
}
