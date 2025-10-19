import React from "react";

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <div className="sr-only">{children}</div>;
}
