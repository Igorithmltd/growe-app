"use client";

import { toaster } from "../components/ui/toaster";

type ToastStatus = "info" | "success" | "warning" | "error" | "loading";

type ShowToastOptions = {
  title: string;
  description?: string;
  status: ToastStatus;
  duration?: number;
};

const useShowToast = () => {
  return ({ title, description, status = "info", duration = 5000 }: ShowToastOptions) => {
    toaster.create({
      title,
      description,
      type: status,
      duration,
    });
  };
};

export default useShowToast;
