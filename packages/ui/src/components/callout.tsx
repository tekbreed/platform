import type React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/composed/icons";

interface CalloutProps {
  variant?: "tip" | "caution" | "danger";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  tip: {
    container:
      "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
    icon: "text-blue-600 dark:text-blue-400",
    title: "text-blue-900 dark:text-blue-100",
    content: "text-blue-800 dark:text-blue-200",
  },
  caution: {
    container:
      "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
    icon: "text-amber-600 dark:text-amber-400",
    title: "text-amber-900 dark:text-amber-100",
    content: "text-amber-800 dark:text-amber-200",
  },
  danger: {
    container:
      "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
    icon: "text-red-600 dark:text-red-400",
    title: "text-red-900 dark:text-red-100",
    content: "text-red-800 dark:text-red-200",
  },
};

const icons = {
  tip: Icons.info,
  caution: Icons.alertTriangle,
  danger: Icons.xCircle,
};

export function Callout({
  variant = "tip",
  title,
  children,
  className,
}: CalloutProps) {
  const style = variants[variant];
  const Icon = icons[variant];

  return (
    <div className={cn("rounded-lg border p-4", style.container, className)}>
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 size-5 shrink-0", style.icon)} />

        <div className="flex-1 space-y-1">
          {title && (
            <p className={cn("text-sm font-medium", style.title)}>{title}</p>
          )}
          <div className={cn("text-sm leading-relaxed", style.content)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
