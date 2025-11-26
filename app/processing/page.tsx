"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ProcessingSteps } from "@/components/processing-steps"
import { ProcessingAnimation } from "@/components/processing-animation"
import { Card, CardContent } from "@/components/ui/card"
import { getAnalysisStatus } from "@/lib/api"

export default function ProcessingPage() {
  const router = useRouter()
  const [fileInfo, setFileInfo] = useState<{ name: string; industry: string } | null>(null)
  const [done, setDone] = useState(false)
  const navigatedRef = useRef(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("uploadedFile")
    if (stored) {
      setFileInfo(JSON.parse(stored))
    }
  }, [])

  const handleComplete = () => {
    // Only navigate if analysis completed (avoid double navigation)
    if (done && !navigatedRef.current) {
      navigatedRef.current = true
      router.push("/results")
    }
  }

  useEffect(() => {
    const storedJob = sessionStorage.getItem("analysisJob")
    if (!storedJob) return

    const { jobId } = JSON.parse(storedJob)
    let interval: any = null

    const startPolling = () => {
      interval = setInterval(async () => {
        try {
          const status = await getAnalysisStatus(jobId)
          if (status.status === "done") {
            sessionStorage.setItem("analysisResult", JSON.stringify(status.result))
            setDone(true)
            if (!navigatedRef.current) {
              navigatedRef.current = true
              router.push("/results")
            }
            clearInterval(interval)
          } else if (status.status === "failed") {
            clearInterval(interval)
            // TODO: show failure state
          }
        } catch (e) {
          console.error(e)
        }
      }, 1500)
    }

    startPolling()

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
          {/* Animation */}
          <div className="mb-12 animate-fade-in">
            <ProcessingAnimation />
          </div>

          {/* Title */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-2xl font-bold text-foreground mb-2">Analyzing Document</h1>
            {fileInfo && (
              <p className="text-muted-foreground">
                Processing <span className="font-medium text-foreground">{fileInfo.name}</span>
              </p>
            )}
          </div>

          {/* Steps */}
          <div className="w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <ProcessingSteps onComplete={handleComplete} />
          </div>

          {/* Info Card */}
          <Card className="mt-12 w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground">
                This typically takes 30-60 seconds depending on document size and complexity.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
