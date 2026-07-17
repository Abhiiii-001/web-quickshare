"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeModal } from "@/store/slices/modalSlice";
import Portal from "./Portal";
import CreatePortalModal from "./CreatePortalModal";

const MODAL_COMPONENTS = {
  CREATE_PORTAL: CreatePortalModal,
};

export default function GlobalModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type, data } = useAppSelector((state) => state.modal);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeModal());
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  if (!isOpen || !type) return null;

  const Component = MODAL_COMPONENTS[type];
  if (!Component) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => dispatch(closeModal())}
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md flex justify-center"
        >
          <Component data={data} />
        </div>
      </div>
    </Portal>
  );
}
