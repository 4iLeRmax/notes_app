import { error } from "console";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { ExternalToast, toast as sonnerToast } from "sonner";
import { vibrate } from "./haptics";

type ToastCustomOptions<T> = {
  success: T;
  error: T;
  warning: T;
  info: T;
};

export const toastCustomOptions: ToastCustomOptions<ExternalToast> = {
  success: {
    classNames: {
      toast: "border-2 border-custom-green",
      title: "text-txt-secondary",
      description: "text-txt-primary",
      icon: "text-custom-green",
    },
    icon: <CheckCircle size={20} />,
  },
  error: {
    classNames: {
      toast: "border-2 border-custom-red",
      title: "text-txt-secondary",
      description: "text-txt-primary text-sm",
      icon: "text-custom-red",
    },
    icon: <XCircle size={30} />,
  },
  warning: {
    classNames: {
      toast: "border-2 border-custom-yellow",
      title: "text-txt-secondary",
      description: "text-txt-primary",
      icon: "text-custom-yellow",
    },
    icon: <AlertCircle size={20} />,
  },
  info: {
    classNames: {
      toast: "border-2 border-custom-blue",
      title: "text-txt-secondary",
      description: "text-txt-primary",
      icon: "text-custom-blue",
    },
    icon: <Info size={20} />,
  },
};

export const toast = {
  success: (title: string, description?: string) => {
    vibrate([10, 50, 10]);
    return sonnerToast.success(title, {
      ...toastCustomOptions.success,
      description,
    });
  },
  error: (title: string, description?: string) => {
    vibrate([100, 50, 100]);

    return sonnerToast.error(title, {
      ...toastCustomOptions.error,
      description,
    });
  },
  warning: (title: string, description?: string) => {
    vibrate([20, 100, 20]);

    return sonnerToast.warning(title, {
      ...toastCustomOptions.warning,
      description,
    });
  },
  info: (title: string, description?: string) => {
    vibrate([20, 100, 20]);

    return sonnerToast.info(title, { ...toastCustomOptions.info, description });
  },
};
