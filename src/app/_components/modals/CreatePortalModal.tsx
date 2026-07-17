"use client";

import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/slices/modalSlice";
import { toast } from "react-toastify";
import axiosInstance from "@/libs/axios/instance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Lock, Unlock, Code } from "lucide-react";
import {
  CODE_PORTAL_DURATION_OPTIONS,
  CODE_PORTAL_LANGUAGES_OPTIONS,
} from "@/constants";

export default function CreatePortalModal({ data }: { data?: any }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      language: CODE_PORTAL_LANGUAGES_OPTIONS[0].value,
      isEditable: true,
      usePassword: false,
      password: "",
      expiresInHours: CODE_PORTAL_DURATION_OPTIONS[0].value,
    },
  });

  const usePassword = watch("usePassword");

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const payload = {
        language: formData.language,
        isEditable: formData.isEditable,
        password: formData.usePassword ? formData.password : undefined,
        expiresInHours: Number(formData.expiresInHours),
      };

      const response = await axiosInstance.post("/portals", payload);

      if (response.data.success) {
        toast.success("Code Portal created! ⚡");
        const { code, creatorToken } = response.data.data;
        // Save creator token to local storage so they are recognized as the owner
        localStorage.setItem(`portal_creator_${code}`, creatorToken);
        dispatch(closeModal());
        router.push(`/portal/${code}`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create portal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-purple-600"></div>

      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase flex items-center gap-2">
            <Code className="w-6 h-6 text-indigo-500" />
            Code Portal
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Create a live collaborative workspace
          </p>
        </div>
        <button
          onClick={() => dispatch(closeModal())}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Primary Language
          </label>
          <select
            {...register("language")}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium appearance-none"
          >
            {CODE_PORTAL_LANGUAGES_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-white text-gray-800"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Expires In
            </label>
            <select
              {...register("expiresInHours")}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium appearance-none"
            >
              {CODE_PORTAL_DURATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-indigo-300 transition-all">
              <input
                type="checkbox"
                {...register("isEditable")}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-sm font-bold text-gray-700">
                Guests Can Edit
              </span>
            </label>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <label className="flex items-center justify-between mb-3 cursor-pointer">
            <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
              {usePassword ? (
                <Lock className="w-4 h-4 text-indigo-500" />
              ) : (
                <Unlock className="w-4 h-4 text-gray-400" />
              )}
              Password Protection
            </span>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                {...register("usePassword")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-600 shadow-inner"></div>
            </div>
          </label>

          {usePassword && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              <input
                type="password"
                {...register("password")}
                placeholder="Set a secure password..."
                className="w-full bg-gray-50 border border-indigo-200 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full font-black py-4 px-6 mt-4 rounded-xl uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:grayscale bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Create Portal ⚡"
          )}
        </button>
      </form>
    </div>
  );
}
