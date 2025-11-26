import { cn } from "@/lib/utils"

interface RiskBadgeProps {
  score: number
}

export function RiskBadge({ score }: RiskBadgeProps) {
  const config =
    score <= 30
      ? { label: "Low", className: "bg-success/10 text-success border-success/30" }
      : score <= 60
        ? { label: "Moderate", className: "bg-warning/10 text-warning border-warning/30" }
        : { label: "High", className: "bg-destructive/10 text-destructive border-destructive/30" }

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
          config.className,
        )}
      >
        {config.label}
      </span>
      <span className="text-sm font-medium text-foreground">{score}</span>
    </div>
  )
}
