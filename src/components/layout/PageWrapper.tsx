import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("container py-8", className)}>
      {children}
    </div>
  );
}
