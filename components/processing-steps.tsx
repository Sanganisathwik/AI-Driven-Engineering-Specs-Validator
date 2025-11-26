"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { FileText, Brain, ShieldCheck, FileOutput, Check, Loader2 } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
  icon: React.ElementType
  duration: number
}

const steps: Step[] = [
  {
    id: 1,
    title: "Extracting Text",
    description: "Reading and parsing document content",
    icon: FileText,
    duration: 2000,
  },
  { id: 2, title: "AI Analysis", description: "Analyzing content with machine learning", icon: Brain, duration: 3000 },
  {
    id: 3,
    title: "Safety Validation",
    description: "Checking against industry safety rules",
    icon: ShieldCheck,
    duration: 2500,
  },
  {
    id: 4,
    title: "Generating Report",
    description: "Compiling findings into report",
    icon: FileOutput,
    duration: 1500,
  },
]

interface ProcessingStepsProps {
  onComplete: () => void
}

export function ProcessingSteps({ onComplete }: ProcessingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(onComplete, 500)
      return
    }

    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep])
      setCurrentStep((prev) => prev + 1)
    }, steps[currentStep].duration)

    return () => clearTimeout(timer)
  }, [currentStep, onComplete])

  return (
    <div className="w-full max-w-md space-y-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index)
        const isCurrent = currentStep === index
        const isPending = index > currentStep
        const Icon = step.icon

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-4 rounded-xl border p-4 transition-all duration-300",
              isCompleted && "border-success/30 bg-success/5",
              isCurrent && "border-primary bg-primary/5 shadow-lg shadow-primary/10",
              isPending && "border-border bg-card opacity-50",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                isCompleted && "bg-success text-success-foreground",
                isCurrent && "bg-primary text-primary-foreground",
                isPending && "bg-muted text-muted-foreground",
              )}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : isCurrent ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Icon className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-medium transition-colors",
                  isCompleted && "text-success",
                  isCurrent && "text-primary",
                  isPending && "text-muted-foreground",
                )}
              >
                {step.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">{step.description}</p>
            </div>
            {isCurrent && (
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
