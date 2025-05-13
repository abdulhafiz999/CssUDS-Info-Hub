"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, ImageIcon, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  value?: string | null
  onChange: (value: string | null) => void
  onFile?: (file: File | null) => void
  className?: string
  label?: string
  description?: string
}

export default function FileUpload({
  accept = "*/*",
  maxSize = 5, // Default 5MB
  value,
  onChange,
  onFile,
  className,
  label = "Upload file",
  description = "Drag and drop or click to upload",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const validateFile = (file: File): boolean => {
    // Check file type if accept is specified
    if (accept !== "*/*") {
      const acceptTypes = accept.split(",").map((type) => type.trim())
      const fileType = file.type

      // Handle special cases like .pdf, .doc, etc.
      if (
        !acceptTypes.some((type) => {
          if (type.startsWith(".")) {
            // Check file extension
            return file.name.toLowerCase().endsWith(type.toLowerCase())
          }
          // Check MIME type
          return fileType === type || (type.endsWith("/*") && fileType.startsWith(type.replace("/*", "/")))
        })
      ) {
        setError(`File type not accepted. Please upload ${accept}`)
        return false
      }
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return false
    }

    setError(null)
    return true
  }

  const handleFile = (file: File) => {
    if (!validateFile(file)) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onChange(result)
      if (onFile) onFile(file)
      setFileName(file.name)
      setFileType(file.type)
      setFileSize(file.size)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      handleFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      handleFile(file)
    }
  }

  const handleRemove = () => {
    onChange(null)
    if (onFile) onFile(null)
    setFileName(null)
    setFileType(null)
    setFileSize(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = () => {
    if (!fileType) return <File className="h-8 w-8 text-muted-foreground" />
    if (fileType.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />
    if (fileType.includes("pdf")) return <FileText className="h-8 w-8 text-red-500" />
    return <File className="h-8 w-8 text-muted-foreground" />
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}

      {!value && !fileName ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center">{description}</p>
          <p className="text-xs text-muted-foreground mt-1">Max size: {maxSize}MB</p>
          <Input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {value && value.startsWith("data:image/") ? (
                <div className="h-12 w-12 rounded overflow-hidden">
                  <img src={value || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                </div>
              ) : (
                getFileIcon()
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{fileName || "File uploaded"}</p>
                {fileSize && <p className="text-xs text-muted-foreground">{formatFileSize(fileSize)}</p>}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemove} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
