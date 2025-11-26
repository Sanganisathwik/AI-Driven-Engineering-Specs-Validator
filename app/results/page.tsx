"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { RiskScoreCard } from "@/components/risk-score-card"
import { SeverityBadge } from "@/components/severity-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Upload, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react"

// Mock data for demonstration
const mockResults = {
  riskScore: 42,
  riskCategory: "moderate" as const,
  summary:
    "The document describes a pressure vessel system operating at 150 PSI. While the primary safety mechanisms are documented, there are concerns regarding the maintenance schedule and pressure relief valve specifications that require attention.",
  parameters: [
    { name: "Operating Pressure", value: "150", unit: "PSI" },
    { name: "Temperature Range", value: "20-180", unit: "°C" },
    { name: "Vessel Capacity", value: "500", unit: "Gallons" },
    { name: "Material Grade", value: "316L", unit: "SS" },
    { name: "Wall Thickness", value: "12.5", unit: "mm" },
    { name: "Design Life", value: "25", unit: "Years" },
  ],
  issues: [
    {
      code: "PSV-001",
      severity: "high" as const,
      description: "Pressure relief valve sizing not specified for maximum flow rate scenario",
    },
    {
      code: "MNT-003",
      severity: "medium" as const,
      description: "Maintenance intervals exceed recommended industry standards",
    },
    {
      code: "DOC-007",
      severity: "low" as const,
      description: "Operating procedure version not referenced in safety section",
    },
    {
      code: "INS-002",
      severity: "medium" as const,
      description: "Inspection schedule missing for weld integrity checks",
    },
  ],
  recommendations: [
    "Review and document pressure relief valve sizing calculations",
    "Reduce maintenance intervals to align with API 510 standards",
    "Update document to reference current operating procedures",
    "Implement weld inspection schedule per ASME requirements",
    "Consider adding redundant pressure monitoring system",
  ],
}

export default function ResultsPage() {
  const [fileInfo, setFileInfo] = useState<{ name: string; industry: string } | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("uploadedFile")
    if (stored) {
      setFileInfo(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              {fileInfo?.name || "Engineering_Document.pdf"}
            </div>
            <h1 className="text-2xl font-bold text-foreground">Analysis Report</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Summary
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Score */}
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <RiskScoreCard score={mockResults.riskScore} category={mockResults.riskCategory} />
            </div>

            {/* Engineering Parameters */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Engineering Parameters</CardTitle>
                <CardDescription>Key values extracted from the document</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockResults.parameters.map((param) => (
                      <TableRow key={param.name} className="group">
                        <TableCell className="font-medium">{param.name}</TableCell>
                        <TableCell className="text-right font-mono">{param.value}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{param.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Detected Issues */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Detected Issues
                </CardTitle>
                <CardDescription>{mockResults.issues.length} issues identified</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Code</TableHead>
                      <TableHead className="w-24">Severity</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockResults.issues.map((issue) => (
                      <TableRow key={issue.code} className="group">
                        <TableCell className="font-mono text-sm">{issue.code}</TableCell>
                        <TableCell>
                          <SeverityBadge severity={issue.severity} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">{issue.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* AI Summary */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{mockResults.summary}</p>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-warning" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockResults.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Link href="/upload">
                      <Upload className="h-4 w-4" />
                      Analyze Another Document
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Link href="/history">
                      <FileText className="h-4 w-4" />
                      View Analysis History
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
