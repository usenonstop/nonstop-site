import Link from "next/link";
import type { HTMLAttributes } from "react";

export const ContactButton = ({
  href,
  icon,
  label,
  show,
  fullWidth,
  invert,
  ...props
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  show: boolean;
  fullWidth?: boolean;
  invert?: boolean;
} & HTMLAttributes<HTMLAnchorElement>) => {
  if (!show) return null;
  return (
    <Link
      draggable={false}
      target="_blank"
      rel="noreferrer noopener"
      href={href}
      className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2 ${
        fullWidth ? "w-full" : ""
      } ${invert ? "bg-gray-800 text-white" : ""}`}
      {...props}
    >
      {icon}
      {label}
    </Link>
  );
};
