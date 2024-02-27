import type { LabelHTMLAttributes, ReactNode } from "react";

export interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const InputLabel = ({
  children,
  className,
  ...props
}: InputLabelProps) => {
  return (
    <label
      className={`text-ns-gray-700 mb-1 block text-sm font-medium ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </label>
  );
};
