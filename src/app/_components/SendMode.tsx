"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Clock, Hash, CheckCircle, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { sendFileSchema } from "@/libs/validation";
import { formatFileSize } from "@/libs/utils";
import { FileUploadData } from "@/types";
import { CommonConstants } from "@/constants";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedFile,
  uploadFileDirect,
  resetUpload,
} from "@/store/slices/fileSlice";

interface SendModeProps {
  onCodeGenerated: (_code: string) => void;
}

const RESTRICTED_EXTENSIONS = [
  ".exe", ".msi", ".bat", ".cmd", ".sh",
  ".apk", ".app", ".scr", ".com", ".vbs", ".ps1"
];

function restrictedFileValidator(file: File) {
  const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
  if (RESTRICTED_EXTENSIONS.includes(extension)) {
    return {
      code: "restricted-file-type",
      message: `File type ${extension} is not supported for security reasons`,
    };
  }
  return null;
}

export default function SendMode({ onCodeGenerated }: SendModeProps) {
  const dispatch = useAppDispatch();
  const {
    selectedFile,
    isUploading,
    uploadProgress,
  } = useAppSelector((state) => state.file);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FileUploadData>({
    resolver: zodResolver(sendFileSchema),
    defaultValues: {
      expiry: "1",
      downloads: 1,
      usePassword: false,
    },
  });

  const usePassword = watch("usePassword");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    validator: restrictedFileValidator,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        const error = fileRejections[0].errors[0];
        toast.error(error.message);
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Clear previous upload state if selecting a different file
        if (selectedFile) {
          dispatch(resetUpload());
        }

        dispatch(setSelectedFile(file));
        toast.success("File selected successfully!");
      }
    },
    maxSize: 100 * 1024 * 1024,
    multiple: false,
  });

  const onSubmit = async (data: FileUploadData) => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      const result = await dispatch(
        uploadFileDirect({ file: selectedFile, options: data })
      ).unwrap();

      onCodeGenerated(result.code);
      toast.success("File shared successfully!");
    } catch {
      toast.error("Upload failed!");
    }
  };

  // Determine submit button state and text
  const isSubmitDisabled = !selectedFile || isUploading;
  const getButtonText = () => {
    if (isUploading) return `Uploading (${uploadProgress}%)`;
    return "Share File ⚡";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all bg-gradient-to-br from-gray-50 to-gray-100 ${
          isDragActive
            ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-cyan-50 scale-[1.02]"
            : "border-gray-300 hover:border-indigo-400"
        }`}
        aria-label="File upload dropzone"
      >
        <input {...getInputProps()} id="file-upload-input" aria-label="Upload file" />
        <svg
          className="w-12 h-12 mx-auto mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-base font-semibold text-gray-700 mb-2">
          Drop your file here
        </p>
        <p className="text-sm text-gray-500">or click to browse</p>
      </div>

      {selectedFile && (
        <div 
          className="bg-white border border-indigo-500/20 rounded-2xl p-4 space-y-3 text-gray-900"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500 shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black truncate text-foreground/80 uppercase tracking-tight">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] text-foreground/40 font-bold">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            {isUploading && (
              <div className="flex items-center gap-2 shrink-0">
                <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
              </div>
            )}
          </div>

          {isUploading && (
            <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
              />
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="expiry-select" className="block text-xs font-semibold text-gray-100 md:text-gray-600 uppercase tracking-wider mb-1.5">
              <Clock className="w-3 h-3 inline mr-1" aria-hidden="true" />
              Expires
            </label>
            <select
              id="expiry-select"
              {...register("expiry")}
              defaultValue={CommonConstants.EXPORIED_DURATION_LIST[0].value}
              className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
            >
              {CommonConstants.EXPORIED_DURATION_LIST.map((item, index) => (
                <option value={item.value} key={`duration-${index}`}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="downloads-input" className="block text-xs font-semibold text-gray-100 md:text-gray-600 uppercase tracking-wider mb-1.5">
              <Hash className="w-3 h-3 inline mr-1" aria-hidden="true" />
              Downloads
            </label>
            <input
              id="downloads-input"
              type="number"
              {...register("downloads", { valueAsNumber: true })}
              className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              min={CommonConstants.DOWNLOAD_LIMIT.MIN}
              max={CommonConstants.DOWNLOAD_LIMIT.MAX}
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2.5">
          <label htmlFor="use-password-toggle" className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <Lock className="w-4 h-4" aria-hidden="true" />
            Password protect
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="use-password-toggle"
              type="checkbox"
              {...register("usePassword")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-600"></div>
          </label>
        </div>

        {usePassword && (
          <div>
            <label htmlFor="password-input" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              {...register("password")}
              placeholder="Set a password"
              className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p id="password-error" className="text-xs text-red-500 mt-1" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full font-black py-4 px-6 rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all active:scale-95 disabled:opacity-30 disabled:grayscale bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
        ) : (
          getButtonText()
        )}
      </button>
    </form>
  );
}

