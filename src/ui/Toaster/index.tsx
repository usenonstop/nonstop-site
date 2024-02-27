"use client";

import { AiOutlineWarning } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "~/ui/Toast";
import { useToast } from "~/hooks/useToast";

export type Severities = "ERROR" | "WARNING" | "SUCCESS" | "INFORMATION";

export const Toaster = () => {
  const { toasts } = useToast();

  const bg: Record<Severities, string> = {
    ERROR: "bg-red-700",
    WARNING: "bg-orange-600",
    SUCCESS: "bg-lime-700",
    INFORMATION: "bg-sky-600",
  };

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        message,
        description,
        action,
        severity,
        ...props
      }) {
        return (
          <Toast
            className={`mt-2 flex h-fit w-fit max-w-full items-center rounded px-3 py-3 text-white shadow-md shadow-gray-500 transition-opacity ${bg[severity]}`}
            key={id}
            {...props}
          >
            {(severity === "ERROR" || severity === "INFORMATION") && (
              <IoMdInformationCircleOutline className="mr-3 min-w-min text-2xl text-white" />
            )}
            {severity === "WARNING" && (
              <AiOutlineWarning className="mr-3 min-w-min text-2xl text-white" />
            )}
            {severity === "SUCCESS" && (
              <BsCheck2Circle className="mr-3 min-w-min text-2xl text-white" />
            )}
            <div className="grid gap-1">
              {message && <ToastTitle>{message}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};
