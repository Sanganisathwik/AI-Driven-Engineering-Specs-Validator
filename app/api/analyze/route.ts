import { NextResponse } from "next/server"

type Job = {
  jobId: string
  status: "processing" | "done" | "failed"
  result?: any
}

// Simple in-memory store for demo purposes
const globalAny: any = globalThis as any
globalAny.__analysisJobs = globalAny.__analysisJobs || new Map<string, Job>()
const jobs: Map<string, Job> = globalAny.__analysisJobs

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, contentBase64, type, size, industry } = body

    // create job
    const jobId = generateId()
    const job: Job = { jobId, status: "processing" }
    jobs.set(jobId, job)

    // Simulate async processing (demo). In production, enqueue a real background job.
    setTimeout(() => {
      try {
        const fakeResult = {
          name,
          industry,
          issues: [
            { id: "I-1", severity: "high", message: "Missing safety step in section 3" },
            { id: "I-2", severity: "medium", message: "Unclear material specification" },
          ],
          summary: "Analysis complete (demo)",
        }
        jobs.set(jobId, { jobId, status: "done", result: fakeResult })
      } catch (e) {
        jobs.set(jobId, { jobId, status: "failed" })
      }
    }, 3000 + Math.floor(Math.random() * 3000))

    return NextResponse.json({ jobId })
  } catch (err) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 })
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const jobId = url.searchParams.get("jobId")
    if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 })

    const job = jobs.get(jobId)
    if (!job) return NextResponse.json({ error: "job not found" }, { status: 404 })

    return NextResponse.json(job)
  } catch (err) {
    return NextResponse.json({ error: "failed" }, { status: 500 })
  }
}
