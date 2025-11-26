import { cn } from "@/lib/utils"

interface SeverityBadgeProps {
  severity: "low" | "medium" | "high"
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = {
    low: {
      label: "Low",
      className: "bg-success/10 text-success border-success/30",
    },
    medium: {
      label: "Medium",
      className: "bg-warning/10 text-warning border-warning/30",
    },
    high: {
      label: "High",
      className: "bg-destructive/10 text-destructive border-destructive/30",
    },
  }[severity]

  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", config.className)}
    >
      {config.label}
    </span>
  )
}
