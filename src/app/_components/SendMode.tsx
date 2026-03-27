"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Clock, Hash } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { sendFileSchema } from "@/libs/validation";
import { formatFileSize, generateShareCode } from "@/libs/utils";
// import { useToast } from '@/hooks/useToast';
import { FileUploadData } from "@/types";
import { CommonConstants } from "@/constants";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedFile, uploadFile } from "@/store/slices/fileSlice";
import { useAppSelector } from "@/store/hooks";

interface SendModeProps {
  onCodeGenerated: (code: string) => void;
}

export default function SendMode({ onCodeGenerated }: SendModeProps) {
  const dispatch = useAppDispatch();
  const { selectedFile, uploadProgress, isUploading, error } = useAppSelector(
    (state) => state.file
  );

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
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        dispatch(setSelectedFile(acceptedFiles[0]));
        toast.success("File selected successfully");
      }
    },
    maxSize: 100 * 1024 * 1024,
    multiple: false,
  });

  const onSubmit = async (data: FileUploadData) => {
    if (!selectedFile) {
      //   addToast('Please select a file first', 'error');
      toast.error("Please select a file first");
      return;
    }

    console.log("debug-form", data);

    try {
      const result = await dispatch(
        uploadFile({ file: selectedFile, options: data })
      ).unwrap();

      onCodeGenerated(result.code);
    } catch (error: any) {
      toast.error("Upload failed!");
    }
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
      >
        <input {...getInputProps()} />
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
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-sm text-cyan-900">
          <strong>📎</strong> {selectedFile.name} (
          {formatFileSize(selectedFile.size)})
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-100 md:text-gray-600 uppercase tracking-wider mb-1.5">
              <Clock className="w-3 h-3 inline mr-1" />
              Expires
            </label>
            <select
              {...register("expiry")}
              defaultValue={CommonConstants.EXPORIED_DURATION_LIST[0].value}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
            >
              {CommonConstants.EXPORIED_DURATION_LIST.map((item, index) => (
                <option value={item.value} key={`duration-${index}`}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-100 md:text-gray-600 uppercase tracking-wider mb-1.5">
              <Hash className="w-3 h-3 inline mr-1" />
              Downloads
            </label>
            <input
              type="number"
              {...register("downloads", { valueAsNumber: true })}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              min={CommonConstants.DOWNLOAD_LIMIT.MIN}
              max={CommonConstants.DOWNLOAD_LIMIT.MAX}
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock className="w-4 h-4" />
            Password protect
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("usePassword")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-600"></div>
          </label>
        </div>

        {usePassword && (
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Set a password"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!selectedFile || isUploading}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
