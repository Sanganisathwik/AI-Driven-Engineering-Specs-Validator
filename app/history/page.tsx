"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { RiskBadge } from "@/components/risk-badge"
import { EmptyState } from "@/components/empty-state"
import { FileTypeIcon } from "@/components/file-type-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Eye, Upload, CheckCircle2, Clock } from "lucide-react"

// Mock history data
const mockHistory = [
  {
    id: 1,
    name: "Pressure_Vessel_Specs.pdf",
    type: "pdf",
    industry: "Oil & Gas",
    riskScore: 42,
    status: "complete",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Electrical_Panel_Design.docx",
    type: "docx",
    industry: "Electrical",
    riskScore: 28,
    status: "complete",
    date: "2024-01-14",
  },
  {
    id: 3,
    name: "Chemical_Process_Flow.pdf",
    type: "pdf",
    industry: "Chemical",
    riskScore: 67,
    status: "complete",
    date: "2024-01-13",
  },
  {
    id: 4,
    name: "Pump_Station_Data.csv",
    type: "csv",
    industry: "Mechanical",
    riskScore: 15,
    status: "complete",
    date: "2024-01-12",
  },
  {
    id: 5,
    name: "Safety_Valve_Report.pdf",
    type: "pdf",
    industry: "Oil & Gas",
    riskScore: 55,
    status: "complete",
    date: "2024-01-11",
  },
  {
    id: 6,
    name: "Turbine_Maintenance.docx",
    type: "docx",
    industry: "Mechanical",
    riskScore: 31,
    status: "processing",
    date: "2024-01-10",
  },
]

const industries = [
  { value: "all", label: "All Industries" },
  { value: "oil-gas", label: "Oil & Gas" },
  { value: "mechanical", label: "Mechanical" },
  { value: "electrical", label: "Electrical" },
  { value: "chemical", label: "Chemical" },
]

const riskFilters = [
  { value: "all", label: "All Risk Levels" },
  { value: "low", label: "Low Risk" },
  { value: "moderate", label: "Moderate Risk" },
  { value: "high", label: "High Risk" },
]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  const filteredHistory = mockHistory.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry =
      industryFilter === "all" || doc.industry.toLowerCase().replace(" & ", "-").replace(" ", "-") === industryFilter
    const matchesRisk =
      riskFilter === "all" ||
      (riskFilter === "low" && doc.riskScore <= 30) ||
      (riskFilter === "moderate" && doc.riskScore > 30 && doc.riskScore <= 60) ||
      (riskFilter === "high" && doc.riskScore > 60)
    return matchesSearch && matchesIndustry && matchesRisk
  })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const showEmptyState = mockHistory.length === 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Document History</h1>
            <p className="text-muted-foreground mt-1">View and manage your analyzed documents</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/upload">
              <Upload className="h-4 w-4" />
              Upload New Document
            </Link>
          </Button>
        </div>

        {showEmptyState ? (
          <Card>
            <CardContent className="p-0">
              <EmptyState />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Filters */}
            <Card className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Select value={industryFilter} onValueChange={setIndustryFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind.value} value={ind.value}>
                            {ind.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={riskFilter} onValueChange={setRiskFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Risk Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {riskFilters.map((risk) => (
                          <SelectItem key={risk.value} value={risk.value}>
                            {risk.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Table */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-0">
                {filteredHistory.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No documents match your filters.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.map((doc) => (
                        <TableRow key={doc.id} className="group cursor-pointer hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <FileTypeIcon type={doc.type} />
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {doc.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-normal">
                              {doc.industry}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <RiskBadge score={doc.riskScore} />
                          </TableCell>
                          <TableCell>
                            {doc.status === "complete" ? (
                              <div className="flex items-center gap-1.5 text-success">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-sm">Complete</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Clock className="h-4 w-4 animate-pulse" />
                                <span className="text-sm">Processing</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(doc.date)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href="/results">
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Summary */}
            <div
              className="mt-4 text-sm text-muted-foreground text-center animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Showing {filteredHistory.length} of {mockHistory.length} documents
            </div>
          </>
        )}
      </main>
    </div>
  )
}
