"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, ShieldAlert, Shield } from "lucide-react"

interface RiskScoreCardProps {
  score: number
  category: "low" | "moderate" | "high"
}

export function RiskScoreCard({ score, category }: RiskScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = score / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setAnimatedScore(score)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [score])

  const config = {
    low: {
      label: "Low Risk",
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/30",
      icon: ShieldCheck,
      ringColor: "stroke-success",
    },
    moderate: {
      label: "Moderate Risk",
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/30",
      icon: Shield,
      ringColor: "stroke-warning",
    },
    high: {
      label: "High Risk",
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      icon: ShieldAlert,
      ringColor: "stroke-destructive",
    },
  }[category]

  const Icon = config.icon
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  return (
    <Card className={cn("overflow-hidden", config.border)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className={cn("h-5 w-5", config.color)} />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className={config.ringColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn("text-3xl font-bold", config.color)}>{animatedScore}</span>
            </div>
          </div>
          <div>
            <div
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                config.bg,
                config.color,
              )}
            >
              {config.label}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on {score <= 30 ? "minimal" : score <= 60 ? "some" : "significant"} safety concerns detected in the
              document.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
