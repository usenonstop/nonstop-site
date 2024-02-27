import { applyIntMask } from "~/fns/applyIntMask";
import { removeIntMask } from "~/fns/removeIntMask";
import { useRef } from "react";

export const AreaInput = ({
  name,
  label,
  value,
  onChange,
  disabled,
}: {
  name: string;
  label: string;
  value: number | null;
  onChange: (val: number | null) => void;
  disabled?: boolean;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => {
        if (ref.current) ref.current.focus();
      }}
      className={`flex w-full select-none justify-center hover:cursor-text ${
        disabled ? "bg-gray-100 hover:cursor-default" : ""
      }`}
    >
      <div className="focus-within:outline-ns-300 relative flex h-16 w-[calc(100%-4px)] flex-col justify-between rounded border p-3 focus-within:outline">
        <label
          className={`text-xs text-gray-400 hover:cursor-text ${
            disabled ? "hover:cursor-default" : ""
          }`}
          htmlFor={name}
        >
          {label}
        </label>
        <div
          className={`flex w-full text-sm text-gray-600 ${
            disabled ? "text-gray-400 hover:cursor-default" : ""
          }`}
        >
          <input
            id={name}
            ref={ref}
            disabled={disabled}
            onChange={(e) => onChange(removeIntMask(e.target.value))}
            value={applyIntMask(value)}
            className={`ml-1 w-full outline-none ${
              disabled ? "hover:cursor-default" : ""
            }`}
          />
          <span>m²</span>
        </div>
      </div>
    </div>
  );
};
