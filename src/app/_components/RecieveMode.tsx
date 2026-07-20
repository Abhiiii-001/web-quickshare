"use client";

import { useForm } from "react-hook-form";
import { Download, Lock } from "lucide-react";
import { receiveFileSchema } from "@/libs/validation";
import { ReceiveFileData } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { downloadFileDirect } from "@/store/slices/fileSlice";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function ReceiveMode() {
  const dispatch = useAppDispatch();
  const { isDownloading } = useAppSelector((state) => state.file);
  const [isDownloadingFile, setIsDownloadingFile] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReceiveFileData>({
    resolver: zodResolver(receiveFileSchema),
    defaultValues: {
      receiveUsePassword: false,
    },
  });

  const receiveUsePassword = watch("receiveUsePassword");

  const onSubmit = async (data: ReceiveFileData) => {
    setIsDownloadingFile(true);
    try {
      const { objectUrl, filename } = await dispatch(
        downloadFileDirect({
          code: data.receiveCode,
          password: data.receivePassword,
        }),
      ).unwrap();

      // Trigger standard browser download using the object URL
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success(
        `Download complete: ${filename}`,
      );
    } catch (error: any) {
      toast.error(error?.message || "Download failed!");
    }
    setIsDownloadingFile(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="receive-code-input" className="block text-xs font-semibold text-gray-100 md:text-gray-600 uppercase tracking-wider mb-1.5">
          Share Code
        </label>
        <input
          id="receive-code-input"
          type="text"
          {...register("receiveCode")}
          placeholder="ABC123"
          maxLength={6}
          className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg px-4 py-5 text-2xl font-mono text-center uppercase tracking-[0.5em] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          aria-describedby={errors.receiveCode ? "receive-code-error" : undefined}
          aria-invalid={!!errors.receiveCode}
        />
        {errors.receiveCode && (
          <p id="receive-code-error" className="text-xs text-red-500 mt-1" role="alert">
            {errors.receiveCode.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2.5">
        <label htmlFor="receive-use-password-toggle" className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <Lock className="w-4 h-4" aria-hidden="true" />
          File is protected
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            id="receive-use-password-toggle"
            type="checkbox"
            {...register("receiveUsePassword")}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-600"></div>
        </label>
      </div>

      {receiveUsePassword && (
        <div>
          <label htmlFor="receive-password-input" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <input
            id="receive-password-input"
            type="password"
            {...register("receivePassword")}
            placeholder="Enter password"
            className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isDownloading || isDownloadingFile}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:cursor-not-allowed disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        aria-busy={isDownloading || isDownloadingFile}
      >
        <Download className="w-4 h-4 inline mr-2" aria-hidden="true" />
        {isDownloading || isDownloadingFile ? "Downloading..." : "Download"}
      </button>
    </form>
  );
}
