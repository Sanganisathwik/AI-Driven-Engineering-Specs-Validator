import { FileText, FileSpreadsheet, File } from "lucide-react"

interface FileTypeIconProps {
  type: string
  className?: string
}

export function FileTypeIcon({ type, className = "h-8 w-8" }: FileTypeIconProps) {
  const iconClass = `${className}`

  switch (type.toLowerCase()) {
    case "pdf":
      return (
        <div className={`${iconClass} flex items-center justify-center rounded-lg bg-destructive/10 text-destructive`}>
          <FileText className="h-4 w-4" />
        </div>
      )
    case "docx":
    case "doc":
      return (
        <div className={`${iconClass} flex items-center justify-center rounded-lg bg-primary/10 text-primary`}>
          <FileText className="h-4 w-4" />
        </div>
      )
    case "csv":
      return (
        <div className={`${iconClass} flex items-center justify-center rounded-lg bg-success/10 text-success`}>
          <FileSpreadsheet className="h-4 w-4" />
        </div>
      )
    case "txt":
      return (
        <div className={`${iconClass} flex items-center justify-center rounded-lg bg-muted text-muted-foreground`}>
          <File className="h-4 w-4" />
        </div>
      )
    default:
      return (
        <div className={`${iconClass} flex items-center justify-center rounded-lg bg-muted text-muted-foreground`}>
          <File className="h-4 w-4" />
        </div>
      )
  }
}
