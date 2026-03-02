"use client";

import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { uploadImageToSupabase } from "@/utils/imageUpload";

interface ImageDropzoneProps {
  label?: string;
  value: string | null;
  onChange: (url: string | null) => void;
  maxSizeMB?: number;
  accept?: string;
  path: string;
  bucket?: string;
  uploadOnSelect?: boolean;
  onFileSelect?: (file: File | null) => void;
  /** "video" = aspect-video (default), "square" = aspect-square */
  aspectRatio?: "video" | "square";
  /** Ancho máximo del preview en px (ej. 150 para logo) */
  maxWidthPx?: number;
}

export const ImageDropzone = ({
  label,
  value,
  onChange,
  maxSizeMB = 10,
  accept = "image/*",
  path,
  bucket = "businesses",
  uploadOnSelect = true,
  onFileSelect,
  aspectRatio = "video",
  maxWidthPx,
}: ImageDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    };
  }, [localPreviewUrl]);

  const validateFile = (file: File) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB}MB`;
    }

    if (!file.type.startsWith("image/")) {
      return "El archivo debe ser una imagen";
    }

    return null;
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const result = await uploadImageToSupabase({
      file,
      path,
      bucket,
      maxSizeMB,
    });

    if (result.success && result.url) {
      onChange(result.url);
    } else {
      setError(result.error || "Error al subir la imagen");
    }

    setIsUploading(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (uploadOnSelect) {
        uploadImage(file);
        return;
      }

      setError(null);
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
      const previewUrl = URL.createObjectURL(file);
      setLocalPreviewUrl(previewUrl);
      onFileSelect?.(file);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (uploadOnSelect) {
        uploadImage(file);
        return;
      }

      setError(null);
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
      const previewUrl = URL.createObjectURL(file);
      setLocalPreviewUrl(previewUrl);
      onFileSelect?.(file);
    }
  };

  const handleRemove = () => {
    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
      setLocalPreviewUrl(null);
    }
    onFileSelect?.(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const imageSrc = localPreviewUrl ?? value;
  const shouldSkipOptimization =
    imageSrc?.startsWith("blob:") ||
    imageSrc?.includes("://127.0.0.1:") ||
    imageSrc?.includes("://localhost:");

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      {imageSrc ? (
        <div
          className="relative border-2 border-dashed rounded-lg p-4"
          style={maxWidthPx ? { maxWidth: maxWidthPx } : undefined}
        >
          <div
            className={cn(
              "relative w-full rounded-lg overflow-hidden bg-muted",
              aspectRatio === "square" ? "aspect-square" : "aspect-video"
            )}
          >
            <Image
              src={imageSrc}
              alt={label || "Imagen"}
              fill
              className="object-cover"
              unoptimized={shouldSkipOptimization}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClick}
              disabled={isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              Cambiar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {isUploading
                  ? "Subiendo..."
                  : "Arrastra una imagen aquí o haz clic para seleccionar"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Tamaño máximo: {maxSizeMB}MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploadOnSelect ? "Subir" : "Seleccionar"}
            </Button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
