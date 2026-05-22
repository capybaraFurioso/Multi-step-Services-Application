import { useState, useRef, useCallback, useEffect, type DragEvent } from 'react'
import { Upload, X, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { formatFileSize, generateId } from '@/utils/format'
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILES } from '@/utils/constants'
import type { UploadedFile } from '@/types'

interface FileUploadProps {
  files: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
  error?: string
}

export function FileUpload({ files, onChange, error }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef(files)

  useEffect(() => {
    filesRef.current = files
  }, [files])

  const simulateUpload = useCallback(
    (file: File) => {
      const uploadFile: UploadedFile = {
        id: generateId(),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading',
      }

      const updated = [...filesRef.current, uploadFile]
      filesRef.current = updated
      onChange(updated)

      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30 + 10
        if (progress >= 100) {
          clearInterval(interval)
          const completed = filesRef.current.map((f) =>
            f.id === uploadFile.id
              ? { ...f, progress: 100, status: 'complete' as const }
              : f
          )
          filesRef.current = completed
          onChange(completed)
        } else {
          const progressing = filesRef.current.map((f) =>
            f.id === uploadFile.id ? { ...f, progress: Math.min(progress, 95) } : f
          )
          filesRef.current = progressing
          onChange(progressing)
        }
      }, 300)
    },
    [onChange]
  )

  const validateAndAdd = useCallback(
    (fileList: FileList) => {
      const remaining = MAX_FILES - filesRef.current.length
      if (remaining <= 0) return

      Array.from(fileList)
        .slice(0, remaining)
        .forEach((file) => {
          if (!ACCEPTED_FILE_TYPES.includes(file.type)) return
          if (file.size > MAX_FILE_SIZE) return
          simulateUpload(file)
        })
    },
    [simulateUpload]
  )

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files) {
        validateAndAdd(e.dataTransfer.files)
      }
    },
    [validateAndAdd]
  )

  const removeFile = useCallback(
    (id: string) => {
      const filtered = filesRef.current.filter((f) => f.id !== id)
      filesRef.current = filtered
      onChange(filtered)
    },
    [onChange]
  )

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Upload files by clicking or dragging"
        className={cn(
          'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 transition-all duration-200 cursor-pointer',
          isDragging
            ? 'border-slate-900 bg-slate-50'
            : error
              ? 'border-red-300 bg-red-50/30'
              : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50',
          files.length >= MAX_FILES && 'pointer-events-none opacity-50'
        )}
      >
        <div
          className={cn(
            'rounded-full p-3 transition-colors',
            isDragging ? 'bg-slate-200' : 'bg-slate-100'
          )}
        >
          <Upload className="h-6 w-6 text-slate-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-slate-700">
            {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            PDF, JPEG, PNG or WebP (max {formatFileSize(MAX_FILE_SIZE)})
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES.join(',')}
          onChange={(e) => e.target.files && validateAndAdd(e.target.files)}
          className="sr-only"
          tabIndex={-1}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2" role="list" aria-label="Uploaded files">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
            >
              <div
                className={cn(
                  'rounded-lg p-2',
                  file.status === 'error' ? 'bg-red-50' : 'bg-slate-50'
                )}
              >
                <FileText
                  className={cn(
                    'h-5 w-5',
                    file.status === 'error' ? 'text-red-500' : 'text-slate-500'
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-700">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {formatFileSize(file.size)}
                </p>
                {file.status === 'uploading' && (
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900 transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {file.status === 'complete' && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                )}
                {file.status === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(file.id)
                  }}
                  className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-slate-500">
        {files.length} of {MAX_FILES} files uploaded
      </p>
    </div>
  )
}
