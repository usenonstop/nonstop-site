import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa";
import { MdHorizontalRule } from "react-icons/md";
import { useEffect, useState } from "react";

type CheckboxProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  value?: boolean | "indeterminate";
  onChange?: (b: boolean) => void;
};

export const Checkbox = ({
  name,
  label,
  disabled,
  value,
  onChange,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(value);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleCheckedChange = (c: boolean) => {
    setChecked(c);
    if (onChange) onChange(c);
  };

  return (
    <div className="flex gap-2">
      <RadixCheckbox.Root
        name={name}
        checked={checked}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        className="border-ns-gray-300 text-ns-gray-600 focus:outline-ns-300 h-4 w-4 rounded border bg-white text-sm shadow-sm shadow-gray-200 outline-2 disabled:cursor-not-allowed disabled:bg-gray-200"
      >
        <RadixCheckbox.Indicator className="text-ns-400 flex items-center justify-center">
          {checked === "indeterminate" && <MdHorizontalRule size={14} />}
          {checked === true && <FaCheck size={10} />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="text-sm text-gray-600" htmlFor={name}>
        {label}
      </label>
      <input hidden id={name} />
    </div>
  );
};
