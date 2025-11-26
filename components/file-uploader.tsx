"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Upload, X, type File, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileTypeIcon } from "@/components/file-type-icon"

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  onClear: () => void
}

export function FileUploader({ onFileSelect, selectedFile, onClear }: FileUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
      setIsDragActive(false)
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toUpperCase() || ""
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (selectedFile) {
    return (
      <div className="rounded-xl border-2 border-success/30 bg-success/5 p-8 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <FileTypeIcon type={getFileExtension(selectedFile.name)} className="h-12 w-12" />
              <div className="absolute -bottom-1 -right-1 rounded-full bg-success p-0.5">
                <CheckCircle2 className="h-4 w-4 text-success-foreground" />
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {getFileExtension(selectedFile.name)} • {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClear} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200",
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-muted/50",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "rounded-full p-4 transition-colors",
            isDragActive ? "bg-primary/10" : "bg-muted group-hover:bg-primary/10",
          )}
        >
          <Upload
            className={cn(
              "h-8 w-8 transition-colors",
              isDragActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
            )}
          />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground">
            {isDragActive ? "Drop your file here" : "Drag & drop your document"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          {["PDF", "DOCX", "TXT", "CSV"].map((type) => (
            <div
              key={type}
              className="flex items-center gap-1.5 rounded-md bg-muted/80 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <FileTypeIcon type={type} className="h-5 w-5" />
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
