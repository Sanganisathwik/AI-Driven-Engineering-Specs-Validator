import { FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <FileText className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No documents analyzed yet</h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        Upload your first engineering document to begin AI-powered analysis and risk validation.
      </p>
      <Button asChild>
        <Link href="/upload">Upload Document</Link>
      </Button>
    </div>
  )
}
