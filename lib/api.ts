"use client"

export interface UploadResponse {
  jobId: string
}

export interface AnalysisStatus {
  jobId: string
  status: "processing" | "done" | "failed"
  result?: any
}

export async function uploadDocument(payload: {
  name: string
  contentBase64: string
  type: string
  size: number
  industry: string
}) {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error('Upload failed')
  return (await res.json()) as UploadResponse
}

export async function getAnalysisStatus(jobId: string) {
  const res = await fetch(`/api/analyze?jobId=${encodeURIComponent(jobId)}`)
  if (!res.ok) throw new Error('Failed to get status')
  return (await res.json()) as AnalysisStatus
}
