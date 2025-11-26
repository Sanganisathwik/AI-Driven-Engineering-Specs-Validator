"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { FileUploader } from "@/components/file-uploader"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Info, Lightbulb, ShieldCheck, FileText } from "lucide-react"
import { uploadDocument } from "@/lib/api"

const industries = [
  { value: "oil-gas", label: "Oil & Gas" },
  { value: "mechanical", label: "Mechanical" },
  { value: "electrical", label: "Electrical" },
  { value: "chemical", label: "Chemical" },
]

export default function UploadPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [industry, setIndustry] = useState<string>("")

  const handleAnalyze = () => {
    if (selectedFile && industry) {
      // Read file as base64 and upload to server
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string
          // dataUrl is like "data:<type>;base64,<base64>"
          const base64 = dataUrl.split(",")[1]
          const resp = await uploadDocument({
            name: selectedFile.name,
            contentBase64: base64,
            type: selectedFile.type,
            size: selectedFile.size,
            industry,
          })

          // save job info and file metadata for processing page
          sessionStorage.setItem(
            "analysisJob",
            JSON.stringify({ jobId: resp.jobId, name: selectedFile.name, industry }),
          )
          sessionStorage.setItem(
            "uploadedFile",
            JSON.stringify({ name: selectedFile.name, size: selectedFile.size, type: selectedFile.type, industry }),
          )
          router.push("/processing")
        } catch (e) {
          // ignore for now — in prod show error
          console.error(e)
        }
      }
      reader.readAsDataURL(selectedFile as unknown as Blob)
    }
  }

  const canProceed = selectedFile && industry

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-3">Upload Document</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload your engineering document to begin AI-powered analysis and risk validation.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Upload Area */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Document</CardTitle>
                  <CardDescription>Choose a file from your computer or drag and drop</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader
                    onFileSelect={setSelectedFile}
                    selectedFile={selectedFile}
                    onClear={() => setSelectedFile(null)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Industry Selection</CardTitle>
                  <CardDescription>Select the industry for domain-specific analysis rules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger id="industry" className="w-full">
                        <SelectValue placeholder="Select industry..." />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind.value} value={ind.value}>
                            {ind.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" className="w-full group" disabled={!canProceed} onClick={handleAnalyze}>
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Sidebar Instructions */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">How it works</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our AI will extract key parameters, analyze content against safety rules, and generate a
                        comprehensive report.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Supported Formats</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">PDF, DOCX, TXT, CSV files up to 50MB</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Secure Processing</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Documents are encrypted and deleted after analysis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Best Results</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Use clear, well-formatted documents for optimal extraction
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
